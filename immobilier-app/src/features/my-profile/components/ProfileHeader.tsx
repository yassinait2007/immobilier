import React from "react";
import { Shield, CheckCircle, AlertCircle, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/types/currentUser";

interface ProfileHeaderProps {
  user: CurrentUser;
  onEditProfile: () => void;
  onEditIdentity: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  onEditProfile, 
  onEditIdentity 
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getIdentityStatusInfo = (status: string) => {
    switch (status) {
      case "valid":
        return {
          icon: <CheckCircle size={16} className="text-green-600" />,
          text: "Identité vérifiée",
          bgColor: "bg-green-50",
          textColor: "text-green-700"
        };
      case "pending":
        return {
          icon: <AlertCircle size={16} className="text-yellow-600" />,
          text: "Vérification en cours",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700"
        };
      case "invalid":
        return {
          icon: <AlertCircle size={16} className="text-red-600" />,
          text: "Identité non vérifiée",
          bgColor: "bg-red-50",
          textColor: "text-red-700"
        };
      default:
        return {
          icon: <AlertCircle size={16} className="text-gray-600" />,
          text: "Non vérifiée",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700"
        };
    }
  };

  const identityStatus = getIdentityStatusInfo(user.identityStatus);
  const isHost = user.type === "host";

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className={`${isHost ? 'bg-gradient-to-br from-emerald-50 to-teal-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} p-6`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Section */}
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarImage 
                src={user.profile} 
                alt={`${user.firstName} ${user.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className={`${isHost ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} text-white text-xl font-bold`}>
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={onEditProfile}
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <Camera size={20} className="text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              {/* Only show role badge for hosts */}
              {isHost && (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Shield size={14} />
                  Hôte
                </div>
              )}
              
              {/* Email Verification */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                user.isEmailVerified 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <CheckCircle size={14} className={user.isEmailVerified ? 'text-green-600' : 'text-gray-400'} />
                Email {user.isEmailVerified ? 'vérifié' : 'non vérifié'}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-gray-600 text-sm space-y-1">
              <p>{user.email}</p>
              {user.tel && <p>{user.tel}</p>}
              {user.address && (
                <p>{user.address.address}, {user.address.city.name}</p>
              )}
            </div>
          </div>

          {/* Identity Verification Section */}
          {isHost && (
            <div className="flex flex-col items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${identityStatus.bgColor}`}>
                {identityStatus.icon}
                <span className={`text-sm font-medium ${identityStatus.textColor}`}>
                  {identityStatus.text}
                </span>
              </div>
              <Button 
              variant="outline" 
              size="sm" 
              onClick={onEditIdentity}
              className="text-gray-600 hover:text-gray-900"
              >
              {user.identityStatus === "valid" ? "Modifier" : "Vérifier identité"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
