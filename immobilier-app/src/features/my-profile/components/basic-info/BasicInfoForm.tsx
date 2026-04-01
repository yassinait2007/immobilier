import React, { useState } from "react";
import { Save, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/types/currentUser";
import { profileBasicInfoSchema, type ProfileBasicInfoData } from "@/schemas/profile";
import { validateStep } from "@/schemas/validation-utils";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PersonalInfoFields from './PersonalInfoFields';
import CustomPhoneInput from './PhoneInput';
import LocationSelector from '../shared/LocationSelector';

interface BasicInfoFormProps {
  user: CurrentUser;
  onSave: (data: ProfileBasicInfoData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  user,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Omit<ProfileBasicInfoData, 'tel'>>(() => {
    const initialData = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address?.address || "",
      city: user.address?.city.id || 0
    };
    return initialData;
  });

  const formatPhoneForDisplay = (phone: string | null) => {
    if (!phone) return undefined;
    return phone.startsWith('+') ? phone : `+${phone}`;
  };
  
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    formatPhoneForDisplay(user.tel)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePhoneChange = (_field: string, value: string | number) => {
    setPhoneNumber(value as string);
    if (errors.tel) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.tel;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const validationData: ProfileBasicInfoData = {
      ...formData,
      tel: phoneNumber || ""
    };

    const { isValid, errors: validationErrors } = validateStep(profileBasicInfoSchema, validationData);
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const submitData: ProfileBasicInfoData = {
      ...formData,
      tel: phoneNumber?.replace(/^\+/, '') || ""
    };

    await onSave(submitData);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <User size={20} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
      <PersonalInfoFields
        formData={formData}
        onChange={handleInputChange}
        errors={errors}
        disabled={isLoading}
      />

      <CustomPhoneInput
        value={phoneNumber}
        onChange={handlePhoneChange}
        error={errors.tel}
        disabled={isLoading}
      />

      <div>
        <Label htmlFor="address">Adresse complète</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={`mt-1 ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          placeholder="Numéro, rue, quartier..."
          disabled={isLoading}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      <LocationSelector
        cityId={formData.city}
        user={user}
        onCityChange={(_field, value) => {
          const cityId = parseInt(value as string) || 0;
          handleInputChange('city', cityId);
        }}
        errors={errors}
      />

      {Object.values(errors).filter(Boolean).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="text-sm text-red-600 space-y-1">
            {Object.values(errors).filter(Boolean).map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Enregistrer
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;