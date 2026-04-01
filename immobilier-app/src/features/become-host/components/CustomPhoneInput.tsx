import React from 'react';
import PhoneInput from 'react-phone-number-input';
import fr from 'react-phone-number-input/locale/fr.json';
import 'react-phone-number-input/style.css';
import '@/styles/phone-input.css';

interface CustomPhoneInputProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  hasError: boolean;
  placeholder?: string;
}

export const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ 
  value, 
  onChange, 
  hasError, 
  placeholder 
}) => {
  return (
    <div className={`phone-input-container ${hasError ? 'phone-input-error' : ''}`}>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="MA"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Entrez votre numéro de téléphone"}
        labels={fr}
        addInternationalOption={false}
        displayInitialValueAsLocalNumber
      />
    </div>
  );
};
