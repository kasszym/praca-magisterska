import { forwardRef, useImperativeHandle, useEffect, useMemo, useRef } from 'react';
import { useSummary } from '../../hooks/useSummary';
import { useValidator } from '../../hooks/useValidator';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
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
  invoiceEmailOption: 'same' | 'different';
  invoiceEmail: string;
  correspondenceAddressOption: 'same' | 'different';
  correspondenceStreet: string;
  correspondenceHouseNumber: string;
  correspondenceApartmentNumber: string;
  correspondencePostCode: string;
  correspondenceCity: string;
}

export interface MainFormRef {
  validateForm: () => Promise<boolean>;
}

const MainForm = forwardRef<MainFormRef>((_props, ref) => {
  const { personalData, setPersonalData } = useSummary();
  const { peselValidator, postCodeValidator } = useValidator();

  const defaultValues: FormData = useMemo(() => {
    if (personalData) {
      return {
        firstName: personalData.firstName || '',
        lastName: personalData.lastName || '',
        pesel: personalData.pesel || '',
        street: personalData.street || '',
        houseNumber: personalData.houseNumber || '',
        apartmentNumber: personalData.apartmentNumber || '',
        postCode: personalData.postCode || '',
        city: personalData.city || '',
        email: personalData.email || '',
        phone: personalData.phone || '',
        invoiceEmailOption: (personalData.invoiceEmailOption as any) || 'same',
        invoiceEmail: personalData.invoiceEmail || '',
        correspondenceAddressOption: (personalData.correspondenceAddressOption as any) || 'same',
        correspondenceStreet: personalData.correspondenceStreet || '',
        correspondenceHouseNumber: personalData.correspondenceHouseNumber || '',
        correspondenceApartmentNumber: personalData.correspondenceApartmentNumber || '',
        correspondencePostCode: personalData.correspondencePostCode || '',
        correspondenceCity: personalData.correspondenceCity || '',
      };
    }
    try {
      const saved = localStorage.getItem('aureon_personal_form_react');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      firstName: '',
      lastName: '',
      pesel: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
      postCode: '',
      city: '',
      email: '',
      phone: '',
      invoiceEmailOption: 'same',
      invoiceEmail: '',
      correspondenceAddressOption: 'same',
      correspondenceStreet: '',
      correspondenceHouseNumber: '',
      correspondenceApartmentNumber: '',
      correspondencePostCode: '',
      correspondenceCity: '',
    };
  }, [personalData]);

  const schema = useMemo(() => {
    return yup.object({
      firstName: yup.string().required('Imię jest wymagane'),
      lastName: yup.string().required('Nazwisko jest wymagane'),
      pesel: yup.string().required('PESEL jest wymagany').test('pesel-valid', function (value) {
        const err = peselValidator(value || '');
        if (err) return this.createError({ message: err });
        return true;
      }),
      street: yup.string().required('Ulica jest wymagana'),
      houseNumber: yup.string().required('Numer domu jest wymagany'),
      apartmentNumber: yup.string().notRequired(),
      postCode: yup.string().required('Kod pocztowy jest wymagany').test('post-code', function (value) {
        const err = postCodeValidator(value || '');
        if (err) return this.createError({ message: err });
        return true;
      }),
      city: yup.string().required('Miejscowość jest wymagana'),
      email: yup.string().required('E-mail jest wymagany').email('Nieprawidłowy format e-mail'),
      phone: yup.string().required('Telefon komórkowy jest wymagany'),
      invoiceEmailOption: yup.string().oneOf(['same', 'different']).required(),
      invoiceEmail: yup.string().when('invoiceEmailOption', {
        is: 'different',
        then: (schema) => schema.required('E-mail do faktury jest wymagany').email('Nieprawidłowy format e-mail'),
        otherwise: (schema) => schema.notRequired(),
      }),
      correspondenceAddressOption: yup.string().oneOf(['same', 'different']).required(),
      correspondenceStreet: yup.string().when('correspondenceAddressOption', {
        is: 'different',
        then: (schema) => schema.required('Ulica jest wymagana'),
        otherwise: (schema) => schema.notRequired(),
      }),
      correspondenceHouseNumber: yup.string().when('correspondenceAddressOption', {
        is: 'different',
        then: (schema) => schema.required('Numer domu jest wymagany'),
        otherwise: (schema) => schema.notRequired(),
      }),
      correspondenceApartmentNumber: yup.string().notRequired(),
      correspondencePostCode: yup.string().when('correspondenceAddressOption', {
        is: 'different',
        then: (schema) => schema.required('Kod pocztowy jest wymagany').test('post-code-2', function (value) {
          const err = postCodeValidator(value || '');
          if (err) return this.createError({ message: err });
          return true;
        }),
        otherwise: (schema) => schema.notRequired(),
      }),
      correspondenceCity: yup.string().when('correspondenceAddressOption', {
        is: 'different',
        then: (schema) => schema.required('Miejscowość jest wymagana'),
        otherwise: (schema) => schema.notRequired(),
      }),
    });
  }, [peselValidator, postCodeValidator]);

  const { control, handleSubmit, watch, trigger, reset } = useForm<FormData>({
    resolver: (yupResolver(schema) as unknown) as any,
    defaultValues,
    mode: 'onBlur',
  });

  const invoiceOption = watch('invoiceEmailOption');
  const correspondenceOption = watch('correspondenceAddressOption');

  const initializedFromPersonalData = useRef(false);

  useEffect(() => {
    const subscription = watch((values) => {
      try {
        localStorage.setItem('aureon_personal_form_react', JSON.stringify(values));
      } catch (e) {}

      const newPersonal = {
        firstName: values.firstName,
        lastName: values.lastName,
        pesel: values.pesel,
        email: values.email,
        phone: values.phone,
        street: values.street,
        houseNumber: values.houseNumber,
        apartmentNumber: values.apartmentNumber,
        postCode: values.postCode,
        city: values.city,
        invoiceEmailOption: values.invoiceEmailOption,
        invoiceEmail: values.invoiceEmail,
        correspondenceAddressOption: values.correspondenceAddressOption,
        correspondenceStreet: values.correspondenceStreet,
        correspondenceHouseNumber: values.correspondenceHouseNumber,
        correspondenceApartmentNumber: values.correspondenceApartmentNumber,
        correspondencePostCode: values.correspondencePostCode,
        correspondenceCity: values.correspondenceCity,
      } as any;

      try {
        const current = JSON.stringify(personalData || {});
        const incoming = JSON.stringify(newPersonal || {});
        if (current !== incoming) {
          setPersonalData(newPersonal);
        }
      } catch (e) {
        // if stringify fails for some reason, fallback to setting
        setPersonalData(newPersonal);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setPersonalData, personalData]);

  useEffect(() => {
    if (personalData && !initializedFromPersonalData.current) {
      reset(defaultValues);
      initializedFromPersonalData.current = true;
    }
  }, [personalData, reset, defaultValues]);

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      const valid = await trigger();
      return valid as boolean;
    },
  }));

  const onSubmit = (data: FormData) => {
    console.log('MainForm submit', data);
  };

  return (
    <Box className="step-two-content">
      <form className="step-two-form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="form-section">
          <h3 className="section-title">Dane osobowe</h3>

          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Imię" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="Nazwisko" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="pesel"
            control={control}
            render={({ field, fieldState }) => (
              <TextField label="PESEL" {...field} inputProps={{ maxLength: 11 }} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Box>

        <Box className="form-section">
          <h3 className="section-title">Adres zamieszkania</h3>
          <Controller name="street" control={control} render={({ field, fieldState }) => <TextField label="Ulica" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
          <Controller name="houseNumber" control={control} render={({ field, fieldState }) => <TextField label="Numer domu" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
          <Controller name="apartmentNumber" control={control} render={({ field }) => <TextField label="Numer mieszkania" {...field} fullWidth margin="normal" />} />
          <Controller name="postCode" control={control} render={({ field, fieldState }) => <TextField label="Kod pocztowy" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
          <Controller name="city" control={control} render={({ field, fieldState }) => <TextField label="Miejscowość" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
        </Box>

        <Box className="form-section">
          <h3 className="section-title">Kontakt</h3>
          <Controller name="email" control={control} render={({ field, fieldState }) => <TextField label="E-mail" {...field} type="email" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
          <Controller name="phone" control={control} render={({ field, fieldState }) => <TextField label="Telefon komórkowy" {...field} type="tel" fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
        </Box>

        <Box className="form-section">
          <h3 className="section-title">E-mail do faktury</h3>
          <Controller
            name="invoiceEmailOption"
            control={control}
            render={({ field }) => (
              <div>
                <div className="version-group" role="tablist" aria-label="Opcja e-mail do faktury">
                  <button
                    type="button"
                    className={`version-button ${field.value === 'same' ? 'active' : ''}`}
                    onClick={() => field.onChange('same')}
                  >
                    Taki sam jak adres e-mail
                  </button>
                  <button
                    type="button"
                    className={`version-button ${field.value === 'different' ? 'active' : ''}`}
                    onClick={() => field.onChange('different')}
                  >
                    Inny
                  </button>
                </div>
              </div>
            )}
          />

          {invoiceOption === 'different' && (
            <Controller
              name="invoiceEmail"
              control={control}
              render={({ field, fieldState }) => (
                <TextField label="E-mail do faktury" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />
              )}
            />
          )}
        </Box>

        <Box className="form-section">
          <h3 className="section-title">Adres korespondencyjny</h3>
          <Controller
            name="correspondenceAddressOption"
            control={control}
            render={({ field }) => (
              <div>
                <div className="version-group" role="tablist" aria-label="Opcja adresu korespondencyjnego">
                  <button
                    type="button"
                    className={`version-button ${field.value === 'same' ? 'active' : ''}`}
                    onClick={() => field.onChange('same')}
                  >
                    Taki sam jak zamieszkania
                  </button>
                  <button
                    type="button"
                    className={`version-button ${field.value === 'different' ? 'active' : ''}`}
                    onClick={() => field.onChange('different')}
                  >
                    Inny
                  </button>
                </div>
              </div>
            )}
          />

          {correspondenceOption === 'different' && (
            <>
              <Controller name="correspondenceStreet" control={control} render={({ field, fieldState }) => <TextField label="Ulica" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
              <Controller name="correspondenceHouseNumber" control={control} render={({ field, fieldState }) => <TextField label="Numer domu" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
              <Controller name="correspondenceApartmentNumber" control={control} render={({ field }) => <TextField label="Numer mieszkania" {...field} fullWidth margin="normal" />} />
              <Controller name="correspondencePostCode" control={control} render={({ field, fieldState }) => <TextField label="Kod pocztowy" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
              <Controller name="correspondenceCity" control={control} render={({ field, fieldState }) => <TextField label="Miejscowość" {...field} fullWidth margin="normal" error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            </>
          )}
        </Box>

        <Box mt={2} display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">Dalej</Button>
        </Box>
      </form>
    </Box>
  );
});

MainForm.displayName = 'MainForm';

export default MainForm;
