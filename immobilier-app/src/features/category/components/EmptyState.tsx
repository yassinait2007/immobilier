import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🏠</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Aucune propriété trouvée
      </h3>
      <p className="text-gray-600 mb-6">
        Essayez de modifier vos critères de recherche pour voir plus de résultats.
      </p>
      <Button
        onClick={onReset}
        className="bg-gradient-to-r from-primary to-primary-light text-white px-6 py-2 rounded-xl"
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
};

export default EmptyState;
