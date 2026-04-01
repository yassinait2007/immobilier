"use client";

import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formaters";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { useNavigate } from "react-router-dom";

export const ContactForm = ({ property }: { property: Property }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { isOpen, openAuthModal } = useAuthModal();

  const onContactClick = () => {
    if (!isAuthenticated) {
      if (!isOpen) {
        openAuthModal("login");
        return;
      }
    }
    navigate(`/inbox/${property.host.id}`);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-light p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Contacter le propriétaire
          </h3>
          <p className="text-primary-foreground/80 text-sm">
            Obtenez plus d'informations sur cette propriété
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(property.price)}
            </div>
            <p className="text-sm font-medium text-gray-600">
              {property.typeTransaction.value === "selle"
                ? "Prix de vente"
                : "Prix mensuel"}
            </p>
          </div>

          <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <Avatar className="h-14 w-14 mr-4 ring-2 ring-primary/20">
                <AvatarImage
                  src={property.host.profile || "/placeholder.svg"}
                  alt={property.host.firstName}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white font-bold">
                  {property.host.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{property.host.firstName} {property.host.lastName}</h4>
                <p className="text-sm font-medium text-primary">
                  {property.typeTransaction.value === "selle"
                    ? "Vendeur certifié"
                    : "Propriétaire"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Contactez {property.host.firstName} pour obtenir plus d'informations 
              sur cette propriété et organiser une visite.
            </p>
          </div>

          <Button
            onClick={onContactClick}
            className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contacter maintenant
          </Button>
        </div>
      </div>
    </div>
  );
};
