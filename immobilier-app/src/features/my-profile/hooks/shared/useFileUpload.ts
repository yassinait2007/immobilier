import { useState, useCallback } from 'react';
import { z } from 'zod';

interface FileUploadOptions {
  schema: z.ZodType<any>;
  fieldName: string;
  generatePreview?: boolean;
}

export const useFileUpload = (options: FileUploadOptions) => {
  const { schema, fieldName, generatePreview = true } = options;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const validateFile = useCallback((file: File): boolean => {
    try {
      const validationData = { [fieldName]: file };
      schema.parse(validationData);
      setErrors(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path.includes(fieldName));
        setErrors(fieldError?.message || 'Fichier invalide');
      } else {
        setErrors('Erreur de validation du fichier');
      }
      return false;
    }
  }, [schema, fieldName]);

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!validateFile(selectedFile)) {
      return false;
    }

    setFile(selectedFile);
    
    if (generatePreview && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }

    return true;
  }, [validateFile, generatePreview]);

  const clearFile = useCallback(() => {
    setFile(null);
    setPreview(null);
    setErrors(null);
    setUploading(false);
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    file,
    preview,
    errors,
    uploading,
    setUploading,
    handleFileSelect,
    clearFile,
    validateFile,
    formatFileSize
  };
};