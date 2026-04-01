import React from 'react';
import { Shield } from 'lucide-react';
import FileUpload from '../shared/FileUpload';
import { useFileUpload } from '../../hooks/shared/useFileUpload';
import { profileIdentitySchema } from '@/schemas/profile';

interface IdentityDocumentUploadProps {
  type: 'front' | 'back';
  onFileChange: (type: 'front' | 'back', file: File | null) => void;
  label: string;
  description: string;
  disabled?: boolean;
}

const IdentityDocumentUpload: React.FC<IdentityDocumentUploadProps> = ({
  type,
  onFileChange,
  label,
  description,
  disabled = false
}) => {
  const fieldName = type === 'front' ? 'identityFront' : 'identityBack';
  
  const {
    file,
    preview,
    errors,
    uploading,
    handleFileSelect,
    clearFile,
    formatFileSize
  } = useFileUpload({
    schema: profileIdentitySchema,
    fieldName,
    generatePreview: true
  });

  const handleFileSelectWrapper = (selectedFile: File) => {
    const success = handleFileSelect(selectedFile);
    if (success) {
      onFileChange(type, selectedFile);
    }
    return success;
  };

  const handleClearWrapper = () => {
    clearFile();
    onFileChange(type, null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-cyan-600" />
        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
      </div>
      
      <FileUpload
        file={file}
        preview={preview}
        errors={errors}
        uploading={uploading || disabled}
        onFileSelect={handleFileSelectWrapper}
        onClear={handleClearWrapper}
        accept="image/*"
        label="Document d'identité"
        description={description}
        showPreview={true}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default IdentityDocumentUpload;