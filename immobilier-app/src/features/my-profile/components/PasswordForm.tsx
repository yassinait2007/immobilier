import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profilePasswordSchema, type ProfilePasswordData } from "@/schemas/profile";
import { validateStep } from "@/schemas/validation-utils";

interface PasswordFormProps {
  onSave: (data: { oldPassword: string; newPassword: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ProfilePasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProfilePasswordData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const { isValid, errors: validationErrors } = validateStep(profilePasswordSchema, formData);
    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onSave({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    });
  };

  const togglePasswordVisibility = (field: 'old' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Lock size={20} className="text-amber-600" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Changer le mot de passe</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="oldPassword">Mot de passe actuel</Label>
          <div className="relative mt-1">
            <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="oldPassword"
              type={showPasswords.old ? "text" : "password"}
              value={formData.oldPassword}
              onChange={(e) => handleInputChange('oldPassword', e.target.value)}
              className={`pl-10 pr-10 ${errors.oldPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('old')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
          )}
        </div>

        <div>
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <div className="relative mt-1">
            <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              className={`pl-10 pr-10 ${errors.newPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre
          </p>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
          <div className="relative mt-1">
            <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full sm:flex-1 bg-amber-600 hover:bg-amber-700 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="hidden sm:inline">Modification...</span>
                <span className="sm:hidden">Modif...</span>
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                <span className="hidden sm:inline">Changer le mot de passe</span>
                <span className="sm:hidden">Changer</span>
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base"
          >
            <X size={16} className="mr-2" />
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};