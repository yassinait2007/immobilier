import React from 'react';
import PhoneInput from 'react-phone-number-input';
import fr from 'react-phone-number-input/locale/fr.json';
import 'react-phone-number-input/style.css';
import { Label } from '@/components/ui/label';
import '@/styles/phone-input.css';

interface CustomPhoneInputProps {
  value: string | undefined;
  onChange: (field: string, value: string | number) => void;
  error?: string;
  disabled?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handlePhoneChange = (phoneValue: string | undefined) => {
    const cleanValue = phoneValue?.replace(/^\+/, '') || '';
    onChange('tel', cleanValue);
  };

  const formatPhoneForDisplay = (phone: string | undefined) => {
    if (!phone) return undefined;
    return phone.startsWith('+') ? phone : `+${phone}`;
  };

  return (
    <div>
      <Label htmlFor="tel">Téléphone</Label>
      <div className={`phone-input-container mt-1 ${error ? 'phone-input-error' : ''}`}>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="MA"
          value={formatPhoneForDisplay(value)}
          onChange={handlePhoneChange}
          placeholder="Entrez votre numéro de téléphone"
          labels={fr}
          addInternationalOption={false}
          displayInitialValueAsLocalNumber
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomPhoneInput;