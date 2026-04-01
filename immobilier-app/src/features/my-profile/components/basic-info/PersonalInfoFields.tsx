import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (field: keyof PersonalInfoFieldsProps['formData'], value: string | number) => void;
  errors: Record<string, string>;
  disabled?: boolean;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  onChange,
  errors,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="firstName">Prénom</Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          className={`mt-1 ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Votre prénom"
          disabled={disabled}
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="lastName">Nom</Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          className={`mt-1 ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Votre nom"
          disabled={disabled}
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoFields;