import { ToastOptions } from "./types";

/**
 * Common toast configurations for different scenarios
 */
export const toastConfigs = {
  // API Success responses
  apiSuccess: (action: string): ToastOptions => ({
    type: "success",
    title: "Succès!",
    description: `${action} effectué avec succès.`,
    duration: 4000,
  }),

  // API Error responses  
  apiError: (action: string, error?: string): ToastOptions => ({
    type: "error",
    title: "Erreur",
    description: error || `Erreur lors de ${action}.`,
    duration: 6000,
  }),

  // Form validation errors
  validationError: (message: string): ToastOptions => ({
    type: "warning",
    title: "Données invalides",
    description: message,
    duration: 5000,
  }),

  // Authentication related
  auth: {
    loginSuccess: (): ToastOptions => ({
      type: "success",
      title: "Connexion réussie!",
      description: "Bienvenue sur votre tableau de bord.",
      duration: 3000,
    }),

    loginError: (error?: string): ToastOptions => ({
      type: "error",
      title: "Échec de la connexion",
      description: error || "Vérifiez vos identifiants.",
      duration: 5000,
    }),

    logout: (): ToastOptions => ({
      type: "info",
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
      duration: 3000,
    }),

    sessionExpired: (): ToastOptions => ({
      type: "warning",
      title: "Session expirée",
      description: "Veuillez vous reconnecter pour continuer.",
      duration: 8000,
      action: {
        label: "Se reconnecter",
        onClick: () => window.location.href = "/",
      },
    }),
  },

  // Booking related
  booking: {
    created: (): ToastOptions => ({
      type: "success",
      title: "Réservation créée!",
      description: "Votre réservation a été créée avec succès.",
      duration: 4000,
    }),

    paymentSuccess: (): ToastOptions => ({
      type: "success",
      title: "Paiement réussi!",
      description: "Votre réservation est maintenant confirmée.",
      duration: 5000,
    }),

    paymentError: (error?: string): ToastOptions => ({
      type: "error",
      title: "Erreur de paiement",
      description: error || "Une erreur s'est produite lors du paiement.",
      duration: 6000,
    }),

    cancelled: (): ToastOptions => ({
      type: "info",
      title: "Réservation annulée",
      description: "Votre réservation a été annulée.",
      duration: 4000,
    }),
  },

  // File operations
  file: {
    uploadSuccess: (fileName: string): ToastOptions => ({
      type: "success",
      title: "Fichier téléchargé",
      description: `${fileName} a été téléchargé avec succès.`,
      duration: 3000,
    }),

    uploadError: (error?: string): ToastOptions => ({
      type: "error",
      title: "Erreur de téléchargement",
      description: error || "Échec du téléchargement du fichier.",
      duration: 5000,
    }),

    deleteSuccess: (fileName: string): ToastOptions => ({
      type: "success",
      title: "Fichier supprimé",
      description: `${fileName} a été supprimé avec succès.`,
      duration: 3000,
    }),
  },

  // Network related
  network: {
    offline: (): ToastOptions => ({
      type: "warning",
      title: "Connexion perdue",
      description: "Vérifiez votre connexion internet.",
      duration: 0, // Don't auto-hide
    }),

    online: (): ToastOptions => ({
      type: "success",
      title: "Connexion rétablie",
      description: "Vous êtes de nouveau en ligne.",
      duration: 3000,
    }),
  },

  // Data operations
  data: {
    saved: (itemType: string = "données"): ToastOptions => ({
      type: "success",
      title: "Sauvegardé!",
      description: `Vos ${itemType} ont été sauvegardées.`,
      duration: 3000,
    }),

    saveError: (itemType: string = "données"): ToastOptions => ({
      type: "error",
      title: "Erreur de sauvegarde",
      description: `Impossible de sauvegarder vos ${itemType}.`,
      duration: 5000,
    }),

    deleted: (itemType: string = "élément"): ToastOptions => ({
      type: "success",
      title: "Supprimé!",
      description: `${itemType} supprimé avec succès.`,
      duration: 3000,
    }),

    deleteError: (itemType: string = "élément"): ToastOptions => ({
      type: "error",
      title: "Erreur de suppression",
      description: `Impossible de supprimer ${itemType}.`,
      duration: 5000,
    }),
  },
};

/**
 * Utility function to create quick toast notifications
 */
export const quickToast = {
  success: (message: string): ToastOptions => ({
    type: "success",
    title: message,
    duration: 3000,
  }),

  error: (message: string): ToastOptions => ({
    type: "error",
    title: message,
    duration: 5000,
  }),

  warning: (message: string): ToastOptions => ({
    type: "warning",
    title: message,
    duration: 4000,
  }),

  info: (message: string): ToastOptions => ({
    type: "info",
    title: message,
    duration: 4000,
  }),
};
