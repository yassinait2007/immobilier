import { z } from 'zod';

// Become Host Schema
export const becomeHostSchema = z.object({
  tel: z.string()
    .min(1, 'Le téléphone est requis')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Format de téléphone invalide (format international requis)')
    .max(20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères'),
  
  city: z.number({
    required_error: 'La ville est requise',
    invalid_type_error: 'La ville doit être sélectionnée'
  }).positive('Veuillez sélectionner une ville'),
  
  address: z.string()
    .min(1, 'L\'adresse est requise')
    .min(10, 'L\'adresse doit contenir au moins 10 caractères')
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères'),
  
  rib: z.string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (!val || val === '') return true;
      const cleanRib = val.replace(/\s/g, '');
      return cleanRib.length === 24 && /^[0-9]+$/.test(cleanRib);
    }, 'Le RIB doit contenir exactement 24 chiffres'),
  
  
  // File validations
  identityFront: z.instanceof(File, { message: 'La pièce d\'identité (recto) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés'),
  
  identityBack: z.instanceof(File, { message: 'La pièce d\'identité (verso) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés'),
  
  profile: z.instanceof(File, { message: 'La photo de profil est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés')
}).refine((data) => {
  // Ensure all required files are present
  return data.identityFront && data.identityBack && data.profile;
}, {
  message: 'Tous les fichiers sont requis',
  path: ['files']
});

// Partial schema for step-by-step validation
export const becomeHostPersonalInfoSchema = z.object({
  tel: z.string()
    .min(1, 'Le téléphone est requis')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Format de téléphone invalide (format international requis)')
});

export const becomeHostLocationSchema = z.object({
  
  city: z.number({
    required_error: 'La ville est requise',
    invalid_type_error: 'La ville doit être sélectionnée'
  }).positive('Veuillez sélectionner une ville'),
  
  address: z.string()
    .min(1, 'L\'adresse est requise')
    .min(10, 'L\'adresse doit contenir au moins 10 caractères')
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères'),
    
  rib: z.string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (!val || val === '') return true; // Optional field
      // RIB validation - only numbers (remove spaces and check)
      const cleanRib = val.replace(/\s/g, '');
      return cleanRib.length === 23 && /^[0-9]+$/.test(cleanRib);
    }, 'Le RIB doit contenir exactement 23 chiffres')
});

export const becomeHostDocumentsSchema = z.object({
  identityFront: z.instanceof(File, { message: 'La pièce d\'identité (recto) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés'),
  
  identityBack: z.instanceof(File, { message: 'La pièce d\'identité (verso) est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés'),
  
  profile: z.instanceof(File, { message: 'La photo de profil est requise' })
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Le fichier ne peut pas dépasser 2MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return allowedTypes.includes(file.type);
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés')
});

// Type inference
export type BecomeHostData = z.infer<typeof becomeHostSchema>;
export type BecomeHostPersonalInfoData = z.infer<typeof becomeHostPersonalInfoSchema>;
export type BecomeHostLocationData = z.infer<typeof becomeHostLocationSchema>;
export type BecomeHostDocumentsData = z.infer<typeof becomeHostDocumentsSchema>;
