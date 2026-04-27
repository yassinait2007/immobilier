import React, { useState } from "react";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/loading";
import { KeyRound, AlertCircle, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OtpForm: React.FC = () => {
  const { verifyOtp, emailForReset } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    if (otp.length !== 5) {
      setError("Veuillez saisir le code complet");
      setIsSubmitting(false);
      return;
    }
    try {
      await verifyOtp(otp);
      openAuthModal("resetPassword");
    } catch (err: any) {
      setError(err.message || "Code OTP invalide");
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* OTP Field */}
        <div className="space-y-2">
          <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
            Code OTP
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={5}
              placeholder="00000"
              className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-center tracking-widest text-lg font-mono"
              disabled={isSubmitting}
              required
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            Entrez le code à 5 chiffres reçu à l'adresse <br/>
            <span className="font-semibold text-gray-700">{emailForReset}</span>
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <ButtonLoading message="Vérification..." size="sm" />
          ) : (
            "Vérifier le code"
          )}
        </Button>
      </form>

      {/* Back to Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => openAuthModal("forgotPassword")}
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-light font-medium transition-colors duration-200"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Changer d'email</span>
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
