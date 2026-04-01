import React from 'react';
import { AlertCircle } from 'lucide-react';

interface BecomeHostErrorProps {
  error: string | null;
}

export const BecomeHostError: React.FC<BecomeHostErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
      <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
      <p className="text-red-600">{error}</p>
    </div>
  );
};
