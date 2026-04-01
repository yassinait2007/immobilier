import { useState } from 'react';
import { useToast } from '@/utils/toast';
import { useAuth } from '@/context/authentication/auth-context';
import { ProfileBasicInfoData } from '@/schemas/profile';
import { 
  ProfileService, 
  PasswordUpdateData, 
  IdentityUpdateData 
} from '../services';

interface UseProfileUpdatesProps {
  onUserUpdate: () => void;
  onTabChange: (tab: string) => void;
}

interface UseProfileUpdatesReturn {
  loading: boolean;
  updateBasicInfo: (data: ProfileBasicInfoData) => Promise<void>;
  updatePassword: (data: PasswordUpdateData) => Promise<void>;
  updateProfileImage: (image: File) => Promise<void>;
  updateIdentityDocuments: (data: IdentityUpdateData) => Promise<void>;
}

export const useProfileUpdates = ({
  onUserUpdate,
  onTabChange,
}: UseProfileUpdatesProps): UseProfileUpdatesReturn => {
  const [loading, setLoading] = useState(false);
  const { success, error: showError } = useToast();
  const { refreshUser } = useAuth();

  const updateBasicInfo = async (data: ProfileBasicInfoData) => {
    try {
      setLoading(true);
      await ProfileService.updateBasicInfo(data);
      onUserUpdate();
      onTabChange('view');
      success(
        "Informations mises à jour",
        "Vos informations personnelles ont été mises à jour avec succès."
      );
    } catch (err) {
      console.error('Error updating basic info:', err);
      showError(
        "Erreur de mise à jour",
        "Impossible de mettre à jour vos informations. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: PasswordUpdateData) => {
    try {
      setLoading(true);
      await ProfileService.updatePassword(data);
      onTabChange('view');
      success(
        "Mot de passe modifié",
        "Votre mot de passe a été modifié avec succès."
      );
    } catch (err) {
      console.error('Error updating password:', err);
      showError(
        "Erreur de modification",
        "Impossible de modifier le mot de passe. Vérifiez votre mot de passe actuel."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfileImage = async (image: File) => {
    try {
      setLoading(true);
      await ProfileService.updateProfileImage(image);
      onUserUpdate();
      onTabChange('view');
      await refreshUser();
      success(
        "Photo mise à jour",
        "Votre photo de profil a été mise à jour avec succès."
      );
    } catch (err) {
      console.error('Error updating profile image:', err);
      showError(
        "Erreur de téléchargement",
        "Impossible de mettre à jour votre photo de profil."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateIdentityDocuments = async (data: IdentityUpdateData) => {
    try {
      setLoading(true);
      await ProfileService.updateIdentityDocuments(data);
      onUserUpdate();
      onTabChange('view');
      success(
        "Documents soumis",
        "Vos documents d'identité ont été soumis avec succès. La vérification peut prendre 24-48h.",
        8000
      );
    } catch (err) {
      console.error('Error updating identity:', err);
      showError(
        "Erreur de soumission",
        "Impossible de soumettre vos documents d'identité."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateBasicInfo,
    updatePassword,
    updateProfileImage,
    updateIdentityDocuments,
  };
};
