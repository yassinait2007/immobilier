import { z } from 'zod';

// Basic validation schemas for each step
export const basicInfoSchema = z.object({
  title: z.string()
    .min(1, 'Le titre est requis')
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  
  description: z.string()
    .min(1, 'La description est requise')
    .min(20, 'La description doit contenir au moins 20 caractères')
    .max(1000, 'La description ne peut pas dépasser 1000 caractères'),
  
  price: z.number({
    required_error: 'Le prix est requis',
    invalid_type_error: 'Le prix doit être un nombre'
  }).positive('Le prix doit être supérieur à 0')
    .max(1000000, 'Le prix ne peut pas dépasser 1 000 000 MAD'),
  
  surface: z.number({
    required_error: 'La surface est requise',
    invalid_type_error: 'La surface doit être un nombre'
  }).positive('La surface doit être supérieure à 0')
    .max(10000, 'La surface ne peut pas dépasser 10 000 m²'),
  
  category: z.string()
    .min(1, 'La catégorie est requise'),
  
  etat: z.string()
    .min(1, 'L\'état est requis'),
  
  typeTransaction: z.string()
    .min(1, 'Le type de transaction est requis'),
    
  tour360Url: z.string()
    .optional()
    .refine((url) => {
      if (!url || url.trim() === '') return true;
      return url.startsWith('https://app.cloudpano.com/tours/');
    }, 'L\'URL doit être un lien CloudPano valide (https://app.cloudpano.com/tours/...)')
    .transform((url) => url?.trim() || undefined)
});

export const locationSchema = z.object({
  address: z.string()
    .min(1, 'L\'adresse est requise')
    .min(10, 'L\'adresse doit contenir au moins 10 caractères'),
  
  latitude: z.number({
    required_error: 'La latitude est requise',
    invalid_type_error: 'La latitude doit être un nombre'
  }).min(-90, 'Latitude invalide')
    .max(90, 'Latitude invalide'),
  
  longitude: z.number({
    required_error: 'La longitude est requise',
    invalid_type_error: 'La longitude doit être un nombre'
  }).min(-180, 'Longitude invalide')
    .max(180, 'Longitude invalide'),
  
  regionId: z.number({
    invalid_type_error: 'La région doit être sélectionnée'
  }).positive('Veuillez sélectionner une région').optional(),
  
  cityId: z.number({
    required_error: 'La ville est requise',
    invalid_type_error: 'La ville doit être sélectionnée'
  }).positive('Veuillez sélectionner une ville')
});

export const detailsSchema = z.object({
  nbRooms: z.number({
    required_error: 'Le nombre de chambres est requis',
    invalid_type_error: 'Le nombre de chambres doit être un nombre'
  }).int('Le nombre de chambres doit être un nombre entier')
    .positive('Le nombre de chambres doit être supérieur à 0')
    .max(50, 'Le nombre de chambres ne peut pas dépasser 50'),
  
  nbBathrooms: z.number({
    required_error: 'Le nombre de salles de bain est requis',
    invalid_type_error: 'Le nombre de salles de bain doit être un nombre'
  }).int('Le nombre de salles de bain doit être un nombre entier')
    .positive('Le nombre de salles de bain doit être supérieur à 0')
    .max(20, 'Le nombre de salles de bain ne peut pas dépasser 20'),
  
  nbEtages: z.number({
    invalid_type_error: 'Le nombre d\'étages doit être un nombre'
  }).int('Le nombre d\'étages doit être un nombre entier')
    .min(0, 'Le nombre d\'étages ne peut pas être négatif')
    .max(100, 'Le nombre d\'étages ne peut pas dépasser 100')
    .optional(),
  
  etage: z.number({
    invalid_type_error: 'L\'étage doit être un nombre'
  }).int('L\'étage doit être un nombre entier')
    .min(0, 'L\'étage ne peut pas être négatif')
    .max(100, 'L\'étage ne peut pas dépasser 100')
    .optional(),
  
  dateConstruction: z.string()
    .optional()
    .refine((date) => {
      if (!date) return true; // Optional field
      const year = new Date(date).getFullYear();
      const currentYear = new Date().getFullYear();
      return year >= 1800 && year <= currentYear;
    }, 'Date de construction invalide')
});

export const featuresSchema = z.object({
  features: z.array(z.string())
    .optional()
    .default([])
});

export const imagesSchema = z.object({
  images: z.array(z.instanceof(File))
    .min(1, 'Au moins une image est requise')
    .max(10, 'Maximum 10 images autorisées')
    .refine((files) => {
      return files.every(file => file.size <= 5 * 1024 * 1024); // 5MB per file
    }, 'Chaque image ne peut pas dépasser 5MB')
    .refine((files) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      return files.every(file => allowedTypes.includes(file.type));
    }, 'Seuls les formats JPEG, PNG et WebP sont autorisés')
});

// Combined schema for complete form validation
export const addPropertySchema = basicInfoSchema
  .merge(locationSchema)
  .merge(detailsSchema)
  .merge(featuresSchema)
  .merge(imagesSchema);

// Step schemas array for step-by-step validation
export const propertyStepSchemas = [
  basicInfoSchema,     // Step 0
  locationSchema,      // Step 1
  detailsSchema,       // Step 2
  featuresSchema,      // Step 3
  imagesSchema         // Step 4
] as const;

// Type for step schemas
export type PropertyStepSchema = typeof propertyStepSchemas[number];

// Type inference from schemas
export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type DetailsData = z.infer<typeof detailsSchema>;
export type FeaturesData = z.infer<typeof featuresSchema>;
export type ImagesData = z.infer<typeof imagesSchema>;
export type AddPropertyData = z.infer<typeof addPropertySchema>;

// Partial schemas for frontend state management
export type PartialPropertyData = Partial<AddPropertyData>;

// Update schema for editing (some fields might be optional)
export const updatePropertySchema = addPropertySchema.extend({
  // Edit-specific fields
  existingImages: z.array(z.object({
    id: z.number(),
    url: z.string().url('URL d\'image invalide')
  })).optional().default([]),
  
  trashImages: z.array(z.string()).optional().default([])
}).partial({
  images: true // Images might not be required when updating if existingImages exist
}).refine((data) => {
  // At least ensure we have some images (new or existing)
  const hasImages = (data.images && data.images.length > 0) || 
                   (data.existingImages && data.existingImages.length > 0);
  return hasImages;
}, {
  message: 'Au moins une image est requise (nouvelle ou existante)',
  path: ['images']
}).refine((data) => {
  // At least ensure we have some content to update
  return data.title || data.description || data.price;
}, 'Au moins un champ doit être modifié');

// Step schemas for editing (reuse existing but modify images validation)
export const editPropertyStepSchemas = [
  basicInfoSchema,     // Step 0
  locationSchema,      // Step 1  
  detailsSchema,       // Step 2
  featuresSchema,      // Step 3
  // Step 4 - Modified images schema for editing
  z.object({
    images: z.array(z.instanceof(File)).optional().default([]),
    existingImages: z.array(z.object({
      id: z.number(),
      url: z.string()
    })).optional().default([]),
    trashImages: z.array(z.string()).optional().default([])
  }).refine((data) => {
    const totalImages = (data.images?.length || 0) + (data.existingImages?.length || 0);
    return totalImages > 0;
  }, {
    message: 'Au moins une image est requise',
    path: ['images']
  })
] as const;

// Type for edit step schemas
export type EditPropertyStepSchema = typeof editPropertyStepSchemas[number];

export type UpdatePropertyData = z.infer<typeof updatePropertySchema>;
