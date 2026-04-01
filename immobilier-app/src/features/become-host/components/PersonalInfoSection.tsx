import React from 'react';
import { User } from 'lucide-react';
import { CustomPhoneInput } from './CustomPhoneInput';

interface PersonalInfoSectionProps {
  phoneNumber: string | undefined;
  onPhoneChange: (value: string | undefined) => void;
  rib: string;
  onRibChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  phoneNumber,
  onPhoneChange,
  rib,
  onRibChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <User className="w-5 h-5 mr-2 text-cyan-600" />
        Informations personnelles
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <CustomPhoneInput
            value={phoneNumber}
            onChange={onPhoneChange}
            hasError={!!errors.tel}
            placeholder="Entrez votre numéro de téléphone"
          />
          {errors.tel && (
            <p className="text-red-600 text-sm mt-1">{errors.tel}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RIB (Optionnel)
          </label>
          <input
            type="text"
            name="rib"
            value={rib}
            onChange={onRibChange}
            className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
              errors.rib ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 17512 00033 10001350000 14"
          />
          {errors.rib && (
            <p className="text-red-600 text-sm mt-1">{errors.rib}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Relevé d'Identité Bancaire pour les virements
          </p>
        </div>
      </div>
    </div>
  );
};
