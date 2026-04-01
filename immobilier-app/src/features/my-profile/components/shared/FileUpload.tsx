import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  file: File | null;
  preview: string | null;
  errors: string | null;
  uploading: boolean;
  onFileSelect: (file: File) => boolean;
  onClear: () => void;
  accept?: string;
  label: string;
  description?: string;
  showPreview?: boolean;
  formatFileSize: (bytes: number) => string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  preview,
  errors,
  uploading,
  onFileSelect,
  onClear,
  accept = "image/*",
  label,
  description,
  showPreview = true,
  formatFileSize
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {file && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Cliquer pour télécharger
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          {showPreview && preview ? (
            <div className="flex items-start space-x-4">
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {errors && (
        <p className="text-sm text-red-600">{errors}</p>
      )}
    </div>
  );
};

export default FileUpload;