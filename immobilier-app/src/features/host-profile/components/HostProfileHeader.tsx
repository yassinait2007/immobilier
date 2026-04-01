import React from "react";
import { Star, Shield, CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HostProfile } from "@/types/hostProfile";
import { formatRate } from "@/utils/formaters";
import { useAuth } from "@/context/authentication/auth-context";

interface HostProfileHeaderProps {
  profile: HostProfile;
}

export const HostProfileHeader: React.FC<HostProfileHeaderProps> = ({ profile }) => {
  const { user } = useAuth();
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage 
                  src={profile.profile} 
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xl font-bold">
                  {getInitials(profile.firstName, profile.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full">
                <Shield size={12} />
              </div>
            </div>

            <div className="text-gray-900">
              <h1 className="text-2xl font-bold mb-1">
                {profile.firstName} {profile.lastName}
              </h1>
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Shield size={14} />
                Hôte
              </div>
              
              <div className="flex items-center justify-center gap-3">
                {profile.nbRates === 0 ? (
                  <div className="flex items-center gap-2 text-gray-500 bg-white px-3 py-1.5 rounded-full">
                    <Star size={16} className="text-gray-400" />
                    <span className="text-sm font-medium">Nouvel hôte</span>
                  </div>
                ) : (
                  <div className="bg-white px-4 py-2 rounded-full flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(profile.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{formatRate(profile.rate)}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm font-medium">{profile.nbRates} avis</span>
                    </div>
                  </div>
                )}
              </div>
              
              {!isOwnProfile && user && (
                <div className="mt-4">
                  <Link to={`/inbox/${profile.id}`}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors">
                      <MessageCircle size={18} className="mr-2" />
                      Contacter l'hôte
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Vérifications</h3>
          <div className="space-y-2">
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              profile.isEmailVerified 
                ? 'bg-green-50' 
                : 'bg-gray-50'
            }`}>
              <div className={`p-1.5 rounded-full ${
                profile.isEmailVerified ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <CheckCircle 
                  size={16} 
                  className={profile.isEmailVerified ? 'text-green-600' : 'text-gray-400'} 
                />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${
                  profile.isEmailVerified ? 'text-green-700' : 'text-gray-600'
                }`}>
                  Email {profile.isEmailVerified ? 'vérifié' : 'non vérifié'}
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              profile.isIdentityVerified 
                ? 'bg-blue-50' 
                : 'bg-gray-50'
            }`}>
              <div className={`p-1.5 rounded-full ${
                profile.isIdentityVerified ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Shield 
                  size={16} 
                  className={profile.isIdentityVerified ? 'text-blue-600' : 'text-gray-400'} 
                />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${
                  profile.isIdentityVerified ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  Identité {profile.isIdentityVerified ? 'vérifiée' : 'non vérifiée'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {profile.nbRates > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{profile.nbRates}</div>
              <div className="text-gray-600 text-xs font-medium">Avis reçus</div>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{formatRate(profile.rate)}</div>
              <div className="text-gray-600 text-xs font-medium">Note moyenne</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
