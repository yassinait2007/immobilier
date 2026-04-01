import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: string;
  isAccessDenied?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, isAccessDenied = false }) => {
  const navigate = useNavigate();

  const getTitle = () => {
    return isAccessDenied ? "Accès non autorisé" : "Réservation introuvable";
  };

  const getHelpText = () => {
    return isAccessDenied 
      ? "Vous n'avez pas les autorisations nécessaires pour accéder à cette page."
      : "Il semble que cette réservation n'existe pas ou que vous n'y avez pas accès. Vérifiez votre lien ou contactez notre support.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white/80 backdrop-blur-sm border border-primary/10 shadow-xl rounded-2xl p-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {getTitle()}
          </h1>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
            <p className="text-red-700 text-sm leading-relaxed">
              {error}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            {getHelpText()}
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate("/client/bookings")}
              className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Mes réservations
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30 rounded-xl py-2.5 font-medium transition-all duration-300"
              >
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </Button>

              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 rounded-xl py-2.5 font-medium transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};