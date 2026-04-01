import { z } from 'zod';

// Basic Profile Information Schema
export const profileBasicInfoSchema = z.object({
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
  
  tel: z.string()
    .min(1, 'Le téléphone est requis')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Format de téléphone invalide (format international requis)')
    .max(20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères'),
  
  address: z.string()
    .min(1, 'L\'adresse est requise')
    .min(10, 'L\'adresse doit contenir au moins 10 caractères')
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères'),
  
  city: z.number({
    required_error: 'La ville est requise',
    invalid_type_error: 'La ville doit être sélectionnée'
  }).positive('Veuillez sélectionner une ville')
});

// Password Change Schema
export const profilePasswordSchema = z.object({
  oldPassword: z.string()
    .min(1, 'Le mot de passe actuel est requis'),
  
  newPassword: z.string()
    .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères')
    .max(50, 'Le nouveau mot de passe ne peut pas dépasser 50 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  confirmPassword: z.string()
    .min(1, 'La confirmation du nouveau mot de passe est requise')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les nouveaux mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

// Profile Image Schema
export const profileImageSchema = z.object({
  profile: z.instanceof(File, { message: 'Une photo de profil est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'La photo ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, JPG et PNG sont autorisés')
});

// Identity Documents Schema (for hosts)
export const profileIdentitySchema = z.object({
  identityFront: z.instanceof(File, { message: 'La pièce d\'identité (recto) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, JPG et PNG sont autorisés')
    .optional(),
  
  identityBack: z.instanceof(File, { message: 'La pièce d\'identité (verso) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, JPG et PNG sont autorisés')
    .optional()
}).refine((data) => {
  // At least one identity document should be provided
  return data.identityFront || data.identityBack;
}, {
  message: 'Au moins un document d\'identité doit être fourni',
  path: ['identityFront']
});

// Type inference
export type ProfileBasicInfoData = z.infer<typeof profileBasicInfoSchema>;
export type ProfilePasswordData = z.infer<typeof profilePasswordSchema>;
export type ProfileImageData = z.infer<typeof profileImageSchema>;
export type ProfileIdentityData = z.infer<typeof profileIdentitySchema>;
