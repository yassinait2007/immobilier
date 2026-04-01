import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'L\'adresse email est requise')
    .email('Adresse email invalide')
    .max(100, 'L\'adresse email ne peut pas dépasser 100 caractères'),
  
  password: z.string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(50, 'Le mot de passe ne peut pas dépasser 50 caractères')
});

// Register Schema
export const registerSchema = z.object({
  firstName: z.string()
    .min(1, 'Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres'),
  
  lastName: z.string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres'),
  
  email: z.string()
    .min(1, 'L\'adresse email est requise')
    .email('Adresse email invalide')
    .max(100, 'L\'adresse email ne peut pas dépasser 100 caractères'),
  
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(50, 'Le mot de passe ne peut pas dépasser 50 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  confirmPassword: z.string()
    .min(1, 'La confirmation du mot de passe est requise')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, 'L\'adresse email est requise')
    .email('Adresse email invalide')
});

// Reset Password Schema  
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(50, 'Le mot de passe ne peut pas dépasser 50 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  confirmPassword: z.string()
    .min(1, 'La confirmation du mot de passe est requise'),
  
  token: z.string()
    .min(1, 'Token de réinitialisation requis')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

// OTP Schema
export const otpSchema = z.object({
  otp: z.string()
    .min(5, 'Le code OTP doit contenir au moins 5 caractères')
    .max(5, 'Le code OTP ne peut pas dépasser 5 caractères')
    .regex(/^\d+$/, 'Le code OTP ne peut contenir que des chiffres'),
  
  email: z.string()
    .email('Adresse email invalide')
});

// Type inference
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type OtpData = z.infer<typeof otpSchema>;
