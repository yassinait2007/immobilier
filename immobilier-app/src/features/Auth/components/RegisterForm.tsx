import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/loading";
import { registerSchema } from "@/schemas/auth";
import { formatZodErrors } from "@/schemas/validation-utils";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RecaptchaWrapper from "@/components/RecaptchaWrapper";

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const { closeAuthModal, switchModalType, executeCallback } = useAuthModal();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});
    setIsSubmitting(true);
    
    try {
      const formData = { firstName, lastName, email, password, confirmPassword };
      const result = registerSchema.safeParse(formData);
      
      if (!result.success) {
        setErrors(formatZodErrors(result.error));
        setError(result.error.errors[0]?.message || "Erreur de validation");
        setIsSubmitting(false);
        return;
      }

      const recaptchaToken = recaptchaRef.current?.getValue();
      if (!recaptchaToken) {
        setError("Veuillez cocher la case 'Je ne suis pas un robot' avant de continuer.");
        setIsSubmitting(false);
        return;
      }

      await register(firstName, lastName, email, password);
      
      executeCallback();
      closeAuthModal(false);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecaptchaError = () => {
    setError("Erreur de chargement de reCAPTCHA. Veuillez vérifier votre connexion internet.");
  };

  const passwordRequirements = [
    { test: password.length >= 8, text: "Au moins 8 caractères" },
    { test: /[A-Z]/.test(password), text: "Une lettre majuscule" },
    { test: /[a-z]/.test(password), text: "Une lettre minuscule" },
    { test: /\d/.test(password), text: "Un chiffre" },
  ];

  return (
    <div className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="register-firstName" className="text-sm font-medium text-gray-700">
              Prénom
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="register-firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                className={`pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                  errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                disabled={isSubmitting}
                required
              />
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-lastName" className="text-sm font-medium text-gray-700">
              Nom
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="register-lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                className={`pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                  errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
                }`}
                disabled={isSubmitting}
                required
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className={`pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
              }`}
              disabled={isSubmitting}
              required
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
            Mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="register-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`pl-10 pr-12 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
              }`}
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
          
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-confirmPassword" className="text-sm font-medium text-gray-700">
            Confirmer le mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="register-confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`pl-10 pr-12 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
                errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
              }`}
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
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <RecaptchaWrapper 
          recaptchaRef={recaptchaRef}
          onError={handleRecaptchaError}
          onExpired={() => setError('reCAPTCHA expiré. Veuillez cocher la case à nouveau.')}
          onChange={(token) => {
            if (token && error?.includes('reCAPTCHA')) {
              setError(null);
            }
          }}
          className="mt-4"
        />

        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
          En créant un compte, vous acceptez nos{" "}
          <Link 
            to="/terms-of-service" 
            className="text-primary hover:text-primary-light font-medium" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link 
            to="/privacy-policy" 
            className="text-primary hover:text-primary-light font-medium" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité
          </Link>.
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <ButtonLoading message="Création du compte..." size="sm" />
          ) : (
            "Créer mon compte"
          )}
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Déjà membre ?</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-600">
          Vous avez déjà un compte ?{" "}
          <button
            type="button"
            onClick={() => switchModalType("login")}
            className="text-primary hover:text-primary-light font-semibold transition-colors duration-200"
            disabled={isSubmitting}
          >
            Connectez-vous
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
