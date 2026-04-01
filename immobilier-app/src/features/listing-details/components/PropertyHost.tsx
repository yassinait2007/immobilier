import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Property } from "@/types/property";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PropertyHost: FC<{ property: Property }> = ({ property }) => {
  const navigate = useNavigate();

  const handleHostProfileClick = () => {
    navigate(`/host/profile/${property.host.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre Hôte</h2>
        <p className="text-gray-600">Rencontrez la personne qui vous accueillera</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleHostProfileClick}
              className="group transition-all duration-300 hover:scale-105"
            >
              <Avatar className="h-20 w-20 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                <AvatarImage
                  src={property.host.profile || "/placeholder.svg"}
                  alt={`${property.host.firstName} ${property.host.lastName}`}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white text-2xl font-bold">
                  {property.host.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
            
            <div className="flex-1">
              <button 
                onClick={handleHostProfileClick}
                className="text-left group transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">
                    {property.host.firstName} {property.host.lastName}
                  </h3>
                  {property.host.isEmailVerified && property.host.isIdentityVerified && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
              <p className="text-primary font-medium mb-2">Hôte</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {property.host.rate > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{property.host.rate.toFixed(1)} ({property.host.nbRates || 0} avis)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
