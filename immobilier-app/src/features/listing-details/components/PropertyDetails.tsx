import { FC } from "react";
import { Bed, Bath, Square, Building2 } from "lucide-react";
import { Property } from "@/types/property";

export const PropertyDetails: FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="w-full space-y-8">
      {/* Property Type and Transaction */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-primary-light text-white">
            {property.category?.name || 'Appartement'}
          </span>
          {property.typeTransaction && (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
              {property.typeTransaction.name}
            </span>
          )}
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
            {property.surface} m²
          </span>
        </div>
      </div>

      {/* Property Description */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-600">Découvrez tous les détails de cette propriété exceptionnelle</p>
        </div>
        <div className="p-6">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {property.description ||
                "Cette magnifique propriété offre un cadre de vie exceptionnel avec tous les équipements modernes pour votre confort. Idéalement située, elle répond à tous vos besoins résidentiels."}
            </p>
          </div>
        </div>
      </div>

      {/* Property Specifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Spécifications</h2>
          <p className="text-gray-600">Caractéristiques techniques de la propriété</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bed className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{property.nbRooms}</div>
              <div className="text-sm font-medium text-gray-600">Chambres</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bath className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{property.nbBathroom}</div>
              <div className="text-sm font-medium text-gray-600">Salles de bains</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Square className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{property.surface}</div>
              <div className="text-sm font-medium text-gray-600">m² Surface</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{property.nbEtages}</div>
              <div className="text-sm font-medium text-gray-600">Étages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Équipements & Services</h2>
          <p className="text-gray-600">Toutes les commodités pour votre confort</p>
        </div>
        <div className="p-6">
          {property.features && property.features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.features.map((feature) => (
                <div key={feature.id} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mr-3">
                    {feature.icon ? (
                      <i className={`${feature.icon} text-white text-sm`} />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{feature.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-400">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun équipement spécifié</h3>
              <p className="text-gray-500">Les équipements détaillés seront disponibles prochainement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
