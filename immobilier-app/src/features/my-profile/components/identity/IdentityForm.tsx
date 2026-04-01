import React, { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/types/currentUser";
import { profileIdentitySchema, type ProfileIdentityData } from "@/schemas/profile";
import { validateStep } from "@/schemas/validation-utils";
import IdentityStatusDisplay from './IdentityStatusDisplay';
import IdentityGuidelines from './IdentityGuidelines';
import IdentityDocumentUpload from './IdentityDocumentUpload';

interface IdentityFormProps {
  user: CurrentUser;
  onSave: (data: { identityFront?: File; identityBack?: File }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const IdentityForm: React.FC<IdentityFormProps> = ({
  user,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [selectedImages, setSelectedImages] = useState<{
    front: File | null;
    back: File | null;
  }>({
    front: null,
    back: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFiles = (): boolean => {
    const dataToValidate: Partial<ProfileIdentityData> = {};
    if (selectedImages.front) dataToValidate.identityFront = selectedImages.front;
    if (selectedImages.back) dataToValidate.identityBack = selectedImages.back;

    const { isValid, errors: validationErrors } = validateStep(profileIdentitySchema, dataToValidate);
    setErrors(validationErrors);
    return isValid;
  };

  const handleFileChange = (type: 'front' | 'back', file: File | null) => {
    setSelectedImages(prev => ({
      ...prev,
      [type]: file
    }));
    
    if (file) {
      const fieldName = `identity${type.charAt(0).toUpperCase() + type.slice(1)}`;
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateFiles()) return;

    const saveData: { identityFront?: File; identityBack?: File } = {};
    if (selectedImages.front) saveData.identityFront = selectedImages.front;
    if (selectedImages.back) saveData.identityBack = selectedImages.back;

    await onSave(saveData);
  };

  return (
    <div className="space-y-6">
      <IdentityStatusDisplay status={user.identityStatus} />
      <IdentityGuidelines />
      
      <div className="space-y-6">
        <IdentityDocumentUpload
          type="front"
          onFileChange={handleFileChange}
          label="Recto du document"
          description="Téléchargez le recto de votre pièce d'identité"
          disabled={isLoading}
        />

        <IdentityDocumentUpload
          type="back"
          onFileChange={handleFileChange}
          label="Verso du document"
          description="Téléchargez le verso de votre pièce d'identité"
          disabled={isLoading}
        />
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="text-sm text-red-600 space-y-1">
            {Object.values(errors).map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || (!selectedImages.front && !selectedImages.back)}
        >
          {isLoading ? (
            "Enregistrement..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default IdentityForm;