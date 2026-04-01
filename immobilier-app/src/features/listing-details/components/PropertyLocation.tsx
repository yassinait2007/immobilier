import { FC } from "react";
import { Property } from "@/types/property";
import { MapPin } from "lucide-react";
import { AddressDisplay } from "@/components/ui/AddressComponents";

interface PropertyLocationSectionProps {
  property: Property;
}

export const PropertyLocation: FC<PropertyLocationSectionProps> = ({
  property,
}) => {
  const latitude = property.location?.latitude;
  const longitude = property.location?.longitude;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const hasValidCoordinates =
    typeof latitude === "number" && typeof longitude === "number";

  const embedUrl =
    hasValidCoordinates && googleMapsApiKey
      ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${latitude},${longitude}&zoom=15`
      : "";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emplacement</h2>
        <p className="text-gray-600">Découvrez le quartier et les environs</p>
      </div>

      <div className="p-6">
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
              <div className="text-gray-700">
                <AddressDisplay address={property.address} format="full" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6">
          <div className="h-[400px] w-full">
            {hasValidCoordinates && googleMapsApiKey ? (
              <iframe
                title="Property Location"
                className="w-full h-full border-0"
                src={embedUrl}
                loading="lazy"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                {!hasValidCoordinates ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Coordonnées non disponibles
                    </h3>
                    <p className="text-gray-500">
                      La localisation exacte n'est pas disponible pour cette
                      propriété.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Configuration requise
                    </h3>
                    <p className="text-gray-500 mb-1">
                      Clé API Google Maps non configurée.
                    </p>
                    <p className="text-sm text-gray-400">
                      Ajoutez VITE_GOOGLE_MAPS_API_KEY dans le fichier .env
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
