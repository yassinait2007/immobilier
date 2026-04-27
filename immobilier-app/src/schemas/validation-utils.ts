import { z } from 'zod';

/**
 * Utility to format Zod validation errors for form display
 */
export const formatZodErrors = (error: z.ZodError | any): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  const issues = error.issues || error.errors || [];
  
  issues.forEach((err: any) => {
    const path = err.path ? err.path.join('.') : 'general';
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
};

/**
 * Validate a single step and return formatted errors - Generic version
 */
export const validateStep = (
  schema: z.ZodSchema<any>, 
  data: unknown
): { isValid: boolean; errors: Record<string, string> } => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  
  return { 
    isValid: false, 
    errors: formatZodErrors(result.error) 
  };
};

/**
 * Validate form data and get the first error message
 */
export const getFirstError = (
  schema: z.ZodSchema<any>, 
  data: unknown
): string | null => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return null;
  }
  
  return result.error.errors[0]?.message || 'Erreur de validation';
};

/**
 * Transform form data to match schema requirements
 */
export const sanitizeFormData = (data: any) => {
  return {
    ...data,
    // Ensure numeric fields are properly converted
    price: data.price ? Number(data.price) : 0,
    surface: data.surface ? Number(data.surface) : 0,
    latitude: data.latitude ? Number(data.latitude) : 0,
    longitude: data.longitude ? Number(data.longitude) : 0,
    regionId: data.regionId ? Number(data.regionId) : undefined, // Optional for API
    cityId: data.cityId ? Number(data.cityId) : 0,
    nbRooms: data.nbRooms ? Number(data.nbRooms) : 0,
    nbBathrooms: data.nbBathrooms ? Number(data.nbBathrooms) : 0,
    nbEtages: data.nbEtages ? Number(data.nbEtages) : undefined,
    etage: data.etage ? Number(data.etage) : undefined,
    // Ensure arrays are properly initialized and features are strings
    features: Array.isArray(data.features) 
      ? data.features.map((feature: any) => String(feature))
      : [],
    images: Array.isArray(data.images) ? data.images : []
  };
};

/**
 * Validate a property form step with proper error handling
 */
export const validatePropertyStep = (
  stepSchemas: readonly z.ZodSchema<any>[],
  step: number,
  data: unknown
): { isValid: boolean; errors: Record<string, string> } => {
  const schema = stepSchemas[step];
  if (!schema) {
    return { isValid: true, errors: {} };
  }
  
  return validateStep(schema, data);
};
