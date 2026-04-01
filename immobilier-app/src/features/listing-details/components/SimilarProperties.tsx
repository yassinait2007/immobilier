import { useEffect, useState } from "react";
import { Property } from "@/types/property";
import { fetchPropertiesByType } from "../api/propertyDetailApi";
import PropertyCard from "@/components/PropertyCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SimilarProperties = ({ property }: { property: Property }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      setLoading(true);
      try {
        const response = await fetchPropertiesByType(
          property.typeTransaction.value
        );
        const similar = response.data.items
          .filter((p) => p.id !== property.id)
          .slice(0, 6);
        setProperties(similar);
      } catch (error) {
        console.error("Error fetching similar properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [property]);

  const viewAllProperties = () => {
    navigate(`/categories?type=${property.typeTransaction.value}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Propriétés similaires</h2>
          </div>
          <p className="text-gray-600">Découvrez d'autres biens qui pourraient vous intéresser</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl h-80 animate-pulse"
              >
                <div className="p-4 space-y-3">
                  <div className="h-48 bg-gray-300 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Propriétés similaires</h2>
          </div>
          <p className="text-gray-600">Découvrez d'autres biens qui pourraient vous intéresser</p>
        </div>
        
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune propriété similaire</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Nous n'avons pas trouvé de propriétés similaires pour le moment. 
            Explorez notre catalogue complet pour découvrir d'autres options.
          </p>
          <Button
            onClick={viewAllProperties}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Voir toutes les propriétés
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Propriétés similaires</h2>
            </div>
            <p className="text-gray-600">Découvrez d'autres biens qui pourraient vous intéresser</p>
          </div>
          
          <Button
            onClick={viewAllProperties}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 py-2 rounded-xl font-semibold transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Voir tout
          </Button>
        </div>
      </div>
      
      <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {properties.map((similarProperty) => (
            <div key={similarProperty.id} className="transform transition-all duration-300 hover:scale-105">
              <PropertyCard property={similarProperty} />
            </div>
          ))}
        </div>
        
        <div className="text-center pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
          Vous cherchez quelque chose de spécifique ?
        </h3>
            <p className="text-gray-600 mb-4">
              Explorez notre collection complète de propriétés et trouvez celle qui vous convient parfaitement.
            </p>
            <Button
            onClick={viewAllProperties}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Explorer toutes les propriétés
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
