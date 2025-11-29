import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useAgreements } from '../../hooks/useAgreements';
import './Agreements.css';

interface Agreement {
  id: number;
  title: string;
  label?: string;
  content: string;
  is_required: boolean;
}

export interface AgreementsRef {
  validateForm: () => boolean;
  getFormValues: () => Agreement[];
}

interface AgreementsProps {
  title?: string;
}

const Agreements = forwardRef<AgreementsRef, AgreementsProps>(({ title }, ref) => {
  const { getAgreementsList, agreementsList } = useAgreements();
  
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(true);
  const [expandedMap, setExpandedMap] = useState<{ [key: number]: boolean }>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!agreementsList) {
      getAgreementsList();
    }
  }, []);

  useEffect(() => {
    if (agreementsList && agreementsList.length > 0 && !isInitialized) {
      const allLabels = agreementsList.map((item) => item.label || item.title);
      setCheckedValues(allLabels);
      setCheckAll(true);
      setIsInitialized(true);
    }
  }, [agreementsList?.length]); 

  const handleCheckAllChange = (checked: boolean) => {
    if (checked && agreementsList) {
      const allLabels = agreementsList.map((item) => item.label || item.title);
      setCheckedValues(allLabels);
      setCheckAll(true);
    } else {
      setCheckedValues([]);
      setCheckAll(false);
    }
  };

  const handleCheckboxChange = (label: string, checked: boolean) => {
    let newCheckedValues: string[];
    if (checked) {
      newCheckedValues = [...checkedValues, label];
    } else {
      newCheckedValues = checkedValues.filter((val) => val !== label);
    }
    setCheckedValues(newCheckedValues);
    
    if (agreementsList) {
      setCheckAll(newCheckedValues.length === agreementsList.length);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const validateForm = (): boolean => {
    if (!agreementsList) return false;

    const requiredCheckboxesArray = agreementsList.filter((item) => item.is_required);
    const allRequiredChecked = requiredCheckboxesArray.every((item) =>
      checkedValues.includes(item.label || item.title)
    );

    return allRequiredChecked;
  };

  const getFormValues = (): Agreement[] => {
    if (!agreementsList) return [];
    return agreementsList.filter((item) => checkedValues.includes(item.label || item.title));
  };

  useImperativeHandle(ref, () => ({
    validateForm,
    getFormValues,
  }));

  if (!agreementsList || agreementsList.length === 0) {
    return <div className="Agreements">Loading...</div>;
  }

  return (
    <div className="Agreements">
      {title && <span className="Agreements__title">{title}</span>}

      <div className="Agreements__actions">
        <input
          type="checkbox"
          checked={checkAll}
          onChange={(e) => handleCheckAllChange(e.target.checked)}
        />
        <span className="Agreements__actions-title">
          Akceptuję i zaznaczam wszystkie zgody
        </span>
      </div>

      <div className="TheSeparator" />

      <div className="Agreements__details">
        {agreementsList.map((item) => {
          const itemLabel = item.label || item.title;
          return (
            <div key={item.id} className="agreement-block">
              <div className="agreement-row">
                <label className="agreement-item">
                  <input
                    type="checkbox"
                    checked={checkedValues.includes(itemLabel)}
                    onChange={(e) => handleCheckboxChange(itemLabel, e.target.checked)}
                  />
                  <span className="agreement-label">
                    {item.title}
                    {item.is_required && <span className="required-star">*</span>}
                  </span>
                </label>
                <button
                  className="expand-toggle"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={!!expandedMap[item.id]}
                  aria-controls={`desc-${item.id}`}
                >
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transition: 'transform 200ms ease',
                      transform: expandedMap[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transformOrigin: 'center',
                    }}
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="var(--black100)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              {expandedMap[item.id] && (
                <div className="agreement-description" id={`desc-${item.id}`}>
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

Agreements.displayName = 'Agreements';

export default Agreements;
