import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { useSummary } from '../../hooks/useSummary';
import { useValidator } from '../../hooks/useValidator';
import './MainForm.css';

interface FormData {
  firstName: string;
  lastName: string;
  pesel: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  postCode: string;
  city: string;
  email: string;
  phone: string;
  invoiceEmailOption: string;
  invoiceEmail: string;
  correspondenceAddressOption: string;
  correspondenceStreet: string;
  correspondenceHouseNumber: string;
  correspondenceApartmentNumber: string;
  correspondencePostCode: string;
  correspondenceCity: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export interface MainFormRef {
  validateForm: () => boolean;
}

const MainForm = forwardRef<MainFormRef>((_props, ref) => {
  const { personalData, setPersonalData } = useSummary();
  const { peselValidator, postCodeValidator } = useValidator();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: personalData?.firstName || '',
    lastName: personalData?.lastName || '',
    pesel: personalData?.pesel || '',
    street: personalData?.street || '',
    houseNumber: personalData?.houseNumber || '',
    apartmentNumber: personalData?.apartmentNumber || '',
    postCode: personalData?.postCode || '',
    city: personalData?.city || '',
    email: personalData?.email || '',
    phone: personalData?.phone || '',
    invoiceEmailOption: personalData?.invoiceEmailOption || 'same',
    invoiceEmail: personalData?.invoiceEmail || '',
    correspondenceAddressOption: personalData?.correspondenceAddressOption || 'same',
    correspondenceStreet: personalData?.correspondenceStreet || '',
    correspondenceHouseNumber: personalData?.correspondenceHouseNumber || '',
    correspondenceApartmentNumber: personalData?.correspondenceApartmentNumber || '',
    correspondencePostCode: personalData?.correspondencePostCode || '',
    correspondenceCity: personalData?.correspondenceCity || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPersonalData(formData);
  }, [formData.firstName, formData.lastName, formData.pesel, formData.email, formData.phone, formData.street, formData.houseNumber, formData.apartmentNumber, formData.postCode, formData.city]);

  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('.form-input');
      inputs.forEach((input) => {
        const htmlInput = input as HTMLInputElement;
        const wrapper = htmlInput.closest('.input-wrapper');
        if (wrapper && htmlInput.value && htmlInput.value.length > 0) {
          wrapper.classList.add('has-value');
        }
      });
    }
  }, []);

  const markHasValue = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const wrapper = target.closest('.input-wrapper');
    if (!wrapper) return;

    if (e.type === 'focus') {
      wrapper.classList.add('focused');
    } else if (e.type === 'blur') {
      wrapper.classList.remove('focused');
    }

    if (target.value && target.value.length > 0) {
      wrapper.classList.add('has-value');
    } else {
      wrapper.classList.remove('has-value');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    markHasValue(e);
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePeselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    setFormData((prev) => ({ ...prev, pesel: value }));
    markHasValue(e);
    if (errors.pesel) {
      setErrors((prev) => ({ ...prev, pesel: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
    setFormData((prev) => ({ ...prev, phone: value }));
    markHasValue(e);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    validateField(name, value);
    markHasValue(e);
  };

  const validateField = (name: string, value: string): string | undefined => {
    let error: string | undefined;

    const requiredFields = [
      'firstName',
      'lastName',
      'pesel',
      'street',
      'houseNumber',
      'postCode',
      'city',
      'email',
      'phone',
    ];

    if (requiredFields.includes(name) && !value.trim()) {
      error = `${getFieldLabel(name)} jest wymagane`;
    }

    if (name === 'pesel' && value.trim()) {
      error = peselValidator(value);
    }

    if (name === 'postCode' && value.trim()) {
      error = postCodeValidator(value);
    }

    if (name === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Nieprawidłowy format e-mail';
      }
    }

    if (name === 'invoiceEmail' && formData.invoiceEmailOption === 'different') {
      if (!value.trim()) {
        error = 'E-mail do faktury jest wymagany';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Nieprawidłowy format e-mail';
        }
      }
    }

    if (formData.correspondenceAddressOption === 'different') {
      const correspondenceFields = [
        'correspondenceStreet',
        'correspondenceHouseNumber',
        'correspondencePostCode',
        'correspondenceCity',
      ];
      
      if (correspondenceFields.includes(name) && !value.trim()) {
        error = `${getFieldLabel(name)} jest wymagane`;
      }

      if (name === 'correspondencePostCode' && value.trim()) {
        error = postCodeValidator(value);
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const getFieldLabel = (name: string): string => {
    const labels: Record<string, string> = {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      pesel: 'PESEL',
      street: 'Ulica',
      houseNumber: 'Numer domu',
      postCode: 'Kod pocztowy',
      city: 'Miejscowość',
      email: 'E-mail',
      phone: 'Telefon komórkowy',
      correspondenceStreet: 'Ulica',
      correspondenceHouseNumber: 'Numer domu',
      correspondencePostCode: 'Kod pocztowy',
      correspondenceCity: 'Miejscowość',
    };
    return labels[name] || name;
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(new Set(Object.keys(formData)));
    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      const isValid = validateAllFields();
      return isValid;
    },
  }));

  return (
    <div className="step-two-content" ref={formRef}>
      <div className="step-two-form">
        <div className="form-section">
          <h3 className="section-title">Dane osobowe</h3>
          
          <div className="form-item">
            <div className={`input-wrapper ${touched.has('firstName') && errors.firstName ? 'is-error' : ''}`}>
              <label className="form-label">Imię</label>
              <input
                type="text"
                className="form-input"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('firstName') && errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('lastName') && errors.lastName ? 'is-error' : ''}`}>
              <label className="form-label">Nazwisko</label>
              <input
                type="text"
                className="form-input"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('lastName') && errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('pesel') && errors.pesel ? 'is-error' : ''}`}>
              <label className="form-label">PESEL</label>
              <input
                type="text"
                className="form-input"
                name="pesel"
                maxLength={11}
                value={formData.pesel}
                onChange={handlePeselChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('pesel') && errors.pesel && (
              <div className="error-message">{errors.pesel}</div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Adres zamieszkania</h3>
          
          <div className="form-item">
            <div className={`input-wrapper ${touched.has('street') && errors.street ? 'is-error' : ''}`}>
              <label className="form-label">Ulica</label>
              <input
                type="text"
                className="form-input"
                name="street"
                value={formData.street}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('street') && errors.street && (
              <div className="error-message">{errors.street}</div>
            )}
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('houseNumber') && errors.houseNumber ? 'is-error' : ''}`}>
              <label className="form-label">Numer domu</label>
              <input
                type="text"
                className="form-input"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('houseNumber') && errors.houseNumber && (
              <div className="error-message">{errors.houseNumber}</div>
            )}
          </div>

          <div className="form-item">
            <div className="input-wrapper">
              <label className="form-label">Numer mieszkania</label>
              <input
                type="text"
                className="form-input"
                name="apartmentNumber"
                value={formData.apartmentNumber}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={markHasValue}
              />
            </div>
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('postCode') && errors.postCode ? 'is-error' : ''}`}>
              <label className="form-label">00-000</label>
              <input
                type="text"
                className="form-input"
                name="postCode"
                maxLength={6}
                value={formData.postCode}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('postCode') && errors.postCode && (
              <div className="error-message">{errors.postCode}</div>
            )}
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('city') && errors.city ? 'is-error' : ''}`}>
              <label className="form-label">Miejscowość</label>
              <input
                type="text"
                className="form-input"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('city') && errors.city && (
              <div className="error-message">{errors.city}</div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Kontakt</h3>
          
          <div className="form-item">
            <div className={`input-wrapper ${touched.has('email') && errors.email ? 'is-error' : ''}`}>
              <label className="form-label">E-mail</label>
              <input
                type="email"
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('email') && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-item">
            <div className={`input-wrapper ${touched.has('phone') && errors.phone ? 'is-error' : ''}`}>
              <label className="form-label">Telefon komórkowy</label>
              <input
                type="tel"
                className="form-input"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={markHasValue}
                onBlur={handleBlur}
              />
            </div>
            {touched.has('phone') && errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">E-mail do faktury</h3>
          
          <div className="form-item">
            <div className="version-group">
              <button
                type="button"
                className={`version-button ${formData.invoiceEmailOption === 'same' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, invoiceEmailOption: 'same' }))}
              >
                Taki sam jak adres e-mail
              </button>
              <button
                type="button"
                className={`version-button ${formData.invoiceEmailOption === 'different' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, invoiceEmailOption: 'different' }))}
              >
                Inny
              </button>
            </div>
          </div>

          {formData.invoiceEmailOption === 'different' && (
            <div className="form-item">
              <div className={`input-wrapper ${touched.has('invoiceEmail') && errors.invoiceEmail ? 'is-error' : ''}`}>
                <label className="form-label">E-mail do faktury</label>
                <input
                  type="email"
                  className="form-input"
                  name="invoiceEmail"
                  value={formData.invoiceEmail}
                  onChange={handleChange}
                  onFocus={markHasValue}
                  onBlur={handleBlur}
                />
              </div>
              {touched.has('invoiceEmail') && errors.invoiceEmail && (
                <div className="error-message">{errors.invoiceEmail}</div>
              )}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3 className="section-title">Adres korespondencyjny</h3>
          
          <div className="form-item">
            <div className="version-group">
              <button
                type="button"
                className={`version-button ${formData.correspondenceAddressOption === 'same' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, correspondenceAddressOption: 'same' }))}
              >
                Taki sam jak zamieszkania
              </button>
              <button
                type="button"
                className={`version-button ${formData.correspondenceAddressOption === 'different' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, correspondenceAddressOption: 'different' }))}
              >
                Inny
              </button>
            </div>
          </div>

          {formData.correspondenceAddressOption === 'different' && (
            <>
              <div className="form-item">
                <div className={`input-wrapper ${touched.has('correspondenceStreet') && errors.correspondenceStreet ? 'is-error' : ''}`}>
                  <label className="form-label">Ulica</label>
                  <input
                    type="text"
                    className="form-input"
                    name="correspondenceStreet"
                    value={formData.correspondenceStreet}
                    onChange={handleChange}
                    onFocus={markHasValue}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.has('correspondenceStreet') && errors.correspondenceStreet && (
                  <div className="error-message">{errors.correspondenceStreet}</div>
                )}
              </div>

              <div className="form-item">
                <div className={`input-wrapper ${touched.has('correspondenceHouseNumber') && errors.correspondenceHouseNumber ? 'is-error' : ''}`}>
                  <label className="form-label">Numer domu</label>
                  <input
                    type="text"
                    className="form-input"
                    name="correspondenceHouseNumber"
                    value={formData.correspondenceHouseNumber}
                    onChange={handleChange}
                    onFocus={markHasValue}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.has('correspondenceHouseNumber') && errors.correspondenceHouseNumber && (
                  <div className="error-message">{errors.correspondenceHouseNumber}</div>
                )}
              </div>

              <div className="form-item">
                <div className="input-wrapper">
                  <label className="form-label">Numer mieszkania</label>
                  <input
                    type="text"
                    className="form-input"
                    name="correspondenceApartmentNumber"
                    value={formData.correspondenceApartmentNumber}
                    onChange={handleChange}
                    onFocus={markHasValue}
                    onBlur={markHasValue}
                  />
                </div>
              </div>

              <div className="form-item">
                <div className={`input-wrapper ${touched.has('correspondencePostCode') && errors.correspondencePostCode ? 'is-error' : ''}`}>
                  <label className="form-label">Kod pocztowy</label>
                  <input
                    type="text"
                    className="form-input"
                    name="correspondencePostCode"
                    maxLength={6}
                    value={formData.correspondencePostCode}
                    onChange={handleChange}
                    onFocus={markHasValue}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.has('correspondencePostCode') && errors.correspondencePostCode && (
                  <div className="error-message">{errors.correspondencePostCode}</div>
                )}
              </div>

              <div className="form-item">
                <div className={`input-wrapper ${touched.has('correspondenceCity') && errors.correspondenceCity ? 'is-error' : ''}`}>
                  <label className="form-label">Miejscowość</label>
                  <input
                    type="text"
                    className="form-input"
                    name="correspondenceCity"
                    value={formData.correspondenceCity}
                    onChange={handleChange}
                    onFocus={markHasValue}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.has('correspondenceCity') && errors.correspondenceCity && (
                  <div className="error-message">{errors.correspondenceCity}</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

MainForm.displayName = 'MainForm';

export default MainForm;
