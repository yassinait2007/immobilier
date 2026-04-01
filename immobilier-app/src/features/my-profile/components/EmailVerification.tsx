import React, { useState } from 'react';
import { Mail, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/utils/toast';
import { resendVerificationEmail } from '../api/profileApi';

interface EmailVerificationProps {
  email: string;
  isEmailVerified: boolean;
  onVerificationSent?: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  isEmailVerified,
  onVerificationSent
}) => {
  const { success, error } = useToast();
  const [sending, setSending] = useState(false);

  const handleResendVerification = async () => {
    try {
      setSending(true);
      const response = await resendVerificationEmail();
      
      if (response.success) {
        success(
          'Email de vérification envoyé',
          'Vérifiez votre boîte de réception et cliquez sur le lien de vérification.'
        );
        onVerificationSent?.();
      } else {
        error(
          'Erreur lors de l\'envoi',
          'Impossible d\'envoyer l\'email de vérification. Réessayez plus tard.'
        );
      }
    } catch (err: any) {
      console.error('Error resending verification email:', err);
      
      if (err.response?.status === 403) {
        error(
          'Accès refusé',
          'Vous n\'êtes pas autorisé à renvoyer l\'email de vérification. Contactez le support si le problème persiste.'
        );
      } else {
        error(
          'Erreur lors de l\'envoi',
          'Une erreur est survenue. Veuillez réessayer.'
        );
      }
    } finally {
      setSending(false);
    }
  };

  if (isEmailVerified) {
    return null;
  }

  return (
    <Alert className="border-amber-200 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <strong>Email non vérifié</strong>
            <p className="text-sm mt-1">
              Veuillez vérifier votre adresse email {email} pour accéder à toutes les fonctionnalités.
            </p>
          </div>
          <Button
            onClick={handleResendVerification}
            disabled={sending}
            size="sm"
            variant="outline"
            className="ml-4 border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            {sending ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Envoi...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Renvoyer
              </>
            )}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
