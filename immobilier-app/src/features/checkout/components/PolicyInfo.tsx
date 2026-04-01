import React from "react";
import { Shield, Info, AlertCircle } from "lucide-react";

export const PolicyInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Informations importantes</h3>
        <p className="text-gray-600">Conditions et politiques à connaître</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Politique d'annulation</h4>
              <p className="text-sm text-blue-700">
                Consultez les conditions d'annulation spécifiques à cette propriété 
                avec votre hôte avant de finaliser votre réservation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Règles importantes</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Respectez les horaires d'arrivée et de départ</li>
                <li>• Suivez les règles spécifiques du logement</li>
                <li>• Communiquez avec votre hôte en cas de besoin</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Paiement sécurisé</h4>
              <p className="text-sm text-green-700">
                Votre paiement est protégé par notre système de sécurité avancé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};