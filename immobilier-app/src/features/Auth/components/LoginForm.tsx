import React, { useState } from "react";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonLoading } from "@/components/ui/loading";
import { loginSchema } from "@/schemas/auth";
import { formatZodErrors } from "@/schemas/validation-utils";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { closeAuthModal, switchModalType, executeCallback } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});
    setIsSubmitting(true);
    
    // Validate form data with Zod
    const formData = { email, password };
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      setError(result.error.errors[0]?.message || "Erreur de validation");
      setIsSubmitting(false);
      return;
    }
    
    try {
      await login(email, password);
      // Execute the stored callback before closing modal
      executeCallback();
      closeAuthModal(false); // Don't clear callback, it's already cleared by executeCallback
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
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
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="login-email"
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

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
            Mot de passe
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="login-password"
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
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={() => switchModalType("forgotPassword")}
            className="text-sm text-primary hover:text-primary-light transition-colors duration-200"
            disabled={isSubmitting}
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-light text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <ButtonLoading message="Connexion..." size="sm" />
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Nouveau sur les vacances d'agadir ?</span>
        </div>
      </div>

      {/* Switch to Register */}
      <div className="text-center">
        <p className="text-gray-600">
          Pas encore de compte ?{" "}
          <button
            type="button"
            onClick={() => switchModalType("register")}
            className="text-primary hover:text-primary-light font-semibold transition-colors duration-200"
            disabled={isSubmitting}
          >
            Créez votre compte
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
