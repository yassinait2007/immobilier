import { z } from 'zod';

// Contact form validation schema
export const ContactFormSchema = z.object({
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .min(1, "L'email est requis"),
  
  subject: z
    .string()
    .min(5, "Le sujet doit contenir au moins 5 caractères")
    .max(100, "Le sujet ne peut pas dépasser 100 caractères"),
  
  tel: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+?[1-9]\d{1,14}|0[1-9](\d{8}|\d{9}))$/.test(val.replace(/\s/g, '')),
      "Veuillez entrer un numéro de téléphone valide"
    ),
  
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères")
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// API response types
export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Contact form submission request
export interface ContactSubmissionRequest {
  email: string;
  subject: string;
  tel?: string;
  message: string;
}