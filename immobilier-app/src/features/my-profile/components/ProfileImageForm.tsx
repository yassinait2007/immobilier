import React, { useState, useRef } from "react";
import { Camera, Upload, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CurrentUser } from "@/types/currentUser";
import { profileImageSchema } from "@/schemas/profile";
import { validateStep } from "@/schemas/validation-utils";

interface ProfileImageFormProps {
  user: CurrentUser;
  onSave: (image: File) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfileImageForm: React.FC<ProfileImageFormProps> = ({
  user,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const validateFile = (file: File): boolean => {
    const { isValid, errors: validationErrors } = validateStep(profileImageSchema, { profile: file });
    setErrors(validationErrors);
    return isValid;
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      return;
    }

    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setErrors({ profile: "Veuillez sélectionner une image" });
      return;
    }

    if (!validateFile(selectedImage)) {
      return;
    }

    await onSave(selectedImage);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isHost = user.type === "host";

  const getFileDisplayInfo = (file: File) => {
    return {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // Size in MB
      type: file.type
    };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Camera size={20} className="text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">Changer la photo de profil</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          {/* Current/Preview Avatar */}
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-gray-200">
              <AvatarImage 
                src={previewUrl || user.profile} 
                alt={`${user.firstName} ${user.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className={`${isHost ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} text-white text-2xl font-bold`}>
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <Camera size={24} className="text-white" />
            </button>
          </div>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Upload Button */}
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileInput}
            className="flex items-center gap-2"
          >
            <Upload size={16} />
            Choisir une nouvelle photo
          </Button>

          {/* Error Display */}
          {errors.profile && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full max-w-md">
              <p className="text-red-700 text-sm text-center">{errors.profile}</p>
            </div>
          )}

          {/* File Info Display */}
          {selectedImage && (
            <div className="text-center w-full max-w-md">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-700 mb-2">
                  <strong>Fichier sélectionné:</strong> {getFileDisplayInfo(selectedImage).name}
                </p>
                <div className="flex justify-center gap-4 text-xs text-green-600">
                  <span>Taille: {getFileDisplayInfo(selectedImage).size} MB</span>
                  <span>Type: {getFileDisplayInfo(selectedImage).type}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Conseils pour une bonne photo de profil:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Format accepté: JPEG, JPG, PNG (max 2MB)</li>
            <li>• Résolution recommandée: au moins 400x400 pixels</li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={!selectedImage || isLoading}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Téléchargement...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Enregistrer la photo
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
          >
            <X size={16} className="mr-2" />
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};
