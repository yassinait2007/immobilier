import React from 'react';
import { Edit2, Lock, Camera, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurrentUser } from '@/types/currentUser';

interface ProfileQuickActionsProps {
  user: CurrentUser;
  onActionClick: (tab: string) => void;
}

export const ProfileQuickActions: React.FC<ProfileQuickActionsProps> = ({
  user,
  onActionClick,
}) => {
  const gridClass = user.type === 'host' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  const getIdentityStatusText = () => {
    switch (user.identityStatus) {
      case 'valid':
        return 'Vérifiée';
      case 'invalid':
        return 'Rejetée';
      case 'pending':
      default:
        return 'En attente';
    }
  };

  return (
    <div className={gridClass}>
      <Button
        variant="outline"
        onClick={() => onActionClick("basic")}
        className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-blue-50"
      >
        <Edit2 size={24} className="text-blue-600" />
        <div className="text-center">
          <div className="font-medium">Modifier mes infos</div>
          <div className="text-xs text-gray-500">Nom, téléphone, adresse</div>
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() => onActionClick("password")}
        className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-amber-50"
      >
        <Lock size={24} className="text-amber-600" />
        <div className="text-center">
          <div className="font-medium">Changer mot de passe</div>
          <div className="text-xs text-gray-500">Sécurité du compte</div>
        </div>
      </Button>

      <Button
        variant="outline"
        onClick={() => onActionClick("photo")}
        className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-purple-50"
      >
        <Camera size={24} className="text-purple-600" />
        <div className="text-center">
          <div className="font-medium">Changer photo</div>
          <div className="text-xs text-gray-500">Photo de profil</div>
        </div>
      </Button>

      {user.type === "host" && (
        <Button
          variant="outline"
          onClick={() => onActionClick("identity")}
          className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-emerald-50"
        >
          <Shield size={24} className="text-emerald-600" />
          <div className="text-center">
            <div className="font-medium">Vérifier identité</div>
            <div className="text-xs text-gray-500">
              {getIdentityStatusText()}
            </div>
          </div>
        </Button>
      )}
    </div>
  );
};
