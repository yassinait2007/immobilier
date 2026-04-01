import React from 'react';
import { Edit2, Lock, Camera, Shield } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CurrentUser } from '@/types/currentUser';

interface ProfileTabNavigationProps {
  user: CurrentUser;
}

export const ProfileTabNavigation: React.FC<ProfileTabNavigationProps> = ({
  user,
}) => {
  const gridClass = user.type === 'host' ? 'grid-cols-5' : 'grid-cols-4';

  return (
    <TabsList className={`grid w-full ${gridClass} bg-gray-100 p-1 rounded-lg`}>
      <TabsTrigger 
        value="view" 
        className="flex items-center gap-2 data-[state=active]:bg-white"
      >
        <span className="hidden sm:inline">Aperçu</span>
        <span className="sm:hidden">Vue</span>
      </TabsTrigger>
      <TabsTrigger 
        value="basic" 
        className="flex items-center gap-2 data-[state=active]:bg-white"
      >
        <Edit2 size={14} />
        <span className="hidden sm:inline">Infos</span>
      </TabsTrigger>
      <TabsTrigger 
        value="password" 
        className="flex items-center gap-2 data-[state=active]:bg-white"
      >
        <Lock size={14} />
        <span className="hidden sm:inline">Mot de passe</span>
      </TabsTrigger>
      <TabsTrigger 
        value="photo" 
        className="flex items-center gap-2 data-[state=active]:bg-white"
      >
        <Camera size={14} />
        <span className="hidden sm:inline">Photo</span>
      </TabsTrigger>
      {user.type === "host" && (
        <TabsTrigger 
          value="identity" 
          className="flex items-center gap-2 data-[state=active]:bg-white"
        >
          <Shield size={14} />
          <span className="hidden sm:inline">Identité</span>
        </TabsTrigger>
      )}
    </TabsList>
  );
};
