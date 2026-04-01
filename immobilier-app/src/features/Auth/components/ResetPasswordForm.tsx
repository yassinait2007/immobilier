import React, { useState } from "react";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/loading";
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ResetPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsSubmitting(false);
      return;
    }
    try {
      await resetPassword(password, ""); // You may want to pass token if needed
      openAuthModal("login");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la réinitialisation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password validation helpers
  const passwordRequirements = [
    { test: password.length >= 8, text: "Au moins 8 caractères" },
    { test: /[A-Z]/.test(password), text: "Une lettre majuscule" },
    { test: /[a-z]/.test(password), text: "Une lettre minuscule" },
    { test: /\d/.test(password), text: "Un chiffre" },
  ];

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
        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="reset-password" className="text-sm font-medium text-gray-700">
            Nouveau mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-12 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Password Requirements */}
          {password && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-600 mb-1">Exigences :</p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <CheckCircle2 
                      className={`h-3 w-3 flex-shrink-0 ${
                        req.test ? 'text-green-500' : 'text-gray-300'
                      }`} 
                    />
                    <span className={`text-xs leading-tight ${
                      req.test ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="reset-confirmPassword" className="text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="reset-confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-12 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isSubmitting}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <ButtonLoading message="Mise à jour..." size="sm" />
          ) : (
            "Mettre à jour le mot de passe"
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

export default ResetPasswordForm;
