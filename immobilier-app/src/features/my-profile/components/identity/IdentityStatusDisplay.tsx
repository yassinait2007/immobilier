import React from 'react';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';

interface IdentityStatusDisplayProps {
  status?: string;
}

const IdentityStatusDisplay: React.FC<IdentityStatusDisplayProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          icon: CheckCircle,
          text: 'Identité vérifiée',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'pending':
        return {
          icon: Clock,
          text: 'Vérification en cours',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      case 'rejected':
        return {
          icon: XCircle,
          text: 'Document rejeté',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          iconColor: 'text-red-500'
        };
      default:
        return {
          icon: AlertCircle,
          text: 'Identité non vérifiée',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          iconColor: 'text-gray-500'
        };
    }
  };

  if (!status || status === 'unverified') {
    return null;
  }

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className={`${config.bgColor} border border-gray-200 rounded-lg p-4 mb-6`}>
      <div className="flex items-center space-x-3">
        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
        <div>
          <p className={`text-sm font-medium ${config.textColor}`}>
            {config.text}
          </p>
          {status === 'pending' && (
            <p className="text-sm text-gray-600 mt-1">
              Votre document est en cours de vérification. Vous recevrez une notification une fois la vérification terminée.
            </p>
          )}
          {status === 'rejected' && (
            <p className="text-sm text-gray-600 mt-1">
              Votre document a été rejeté. Veuillez soumettre un nouveau document.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityStatusDisplay;