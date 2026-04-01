import React from 'react';
import { Info } from 'lucide-react';

const IdentityGuidelines: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="text-blue-800">
          <h4 className="font-medium mb-2">Instructions importantes</h4>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Utilisez une carte d'identité nationale ou un passeport valide</li>
            <li>Assurez-vous que tous les textes sont lisibles</li>
            <li>La photo doit être nette et bien éclairée</li>
            <li>Format accepté: JPEG, JPG, PNG (max 2MB)</li>
            <li>Recto et verso requis pour la carte d'identité</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IdentityGuidelines;