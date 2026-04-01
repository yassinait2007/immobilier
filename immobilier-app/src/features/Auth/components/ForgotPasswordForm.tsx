import React, { useState } from "react";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/loading";
import { Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setSuccess("Un code a été envoyé à votre adresse email.");
      openAuthModal("otp");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi de l'email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="forgot-email" className="text-sm font-medium text-gray-700">
            Adresse email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <ButtonLoading message="Envoi..." size="sm" />
          ) : (
            "Envoyer le code"
          )}
        </Button>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => openAuthModal("login")}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-light font-medium transition-colors duration-200"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à la connexion</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
