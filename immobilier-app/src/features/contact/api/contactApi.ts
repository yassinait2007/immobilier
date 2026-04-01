import apiClient from '@/api/apiClient';
import type { ContactSubmissionRequest, ContactApiResponse } from '@/schemas/contact';

/**
 * Submit contact form
 */
export const submitContactForm = async (data: ContactSubmissionRequest): Promise<ContactApiResponse> => {
  try {
    const response = await apiClient.post('/contact-us', data);
    const { success, message } = response.data;
    
    if (success) {
      return {
        success: true,
        message: 'Votre message a été envoyé avec succès!',
        data: response.data
      };
    } else {
      return {
        success: false,
        message: message || 'Une erreur s\'est produite lors de l\'envoi du message'
      };
    }
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    
    // Handle different error scenarios
    if (error.response?.data?.message) {
      return {
        success: false,
        message: error.response.data.message
      };
    }
    
    if (error.response?.data?.success === false) {
      return {
        success: false,
        message: error.response.data.message || 'Une erreur s\'est produite'
      };
    }
    
    if (error.response?.status === 422) {
      return {
        success: false,
        message: 'Veuillez vérifier les données saisies'
      };
    }
    
    if (error.response?.status >= 500) {
      return {
        success: false,
        message: 'Erreur serveur. Veuillez réessayer plus tard.'
      };
    }
    
    return {
      success: false,
      message: 'Une erreur inattendue s\'est produite'
    };
  }
};