import React from 'react';
import { FileImage, User, Upload, CheckCircle } from 'lucide-react';
import type { FileTypes } from '@/types/becomeHost';

interface DocumentsSectionProps {
  files: FileTypes;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FileTypes) => void;
  errors: Record<string, string>;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  files,
  onFileChange,
  errors
}) => {
  const documentFields = [
    { key: 'identityFront', label: 'Pièce d\'identité (recto)', icon: FileImage },
    { key: 'identityBack', label: 'Pièce d\'identité (verso)', icon: FileImage },
    { key: 'profile', label: 'Photo de profil', icon: User }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <FileImage className="w-5 h-5 mr-2 text-cyan-600" />
        Documents requis
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentFields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label} *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e, key as keyof FileTypes)}
                className="hidden"
                id={key}
                required
              />
              <label
                htmlFor={key}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                  errors[key] ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {files[key as keyof FileTypes] ? (
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Fichier sélectionné</p>
                    <p className="text-xs text-gray-500">{files[key as keyof FileTypes]?.name}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Cliquez pour télécharger</p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                  </div>
                )}
              </label>
            </div>
            {errors[key] && (
              <p className="text-red-600 text-sm mt-1">{errors[key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
