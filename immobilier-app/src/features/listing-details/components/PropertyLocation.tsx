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
    latitude !== undefined && latitude !== null && !isNaN(Number(latitude)) && 
    longitude !== undefined && longitude !== null && !isNaN(Number(longitude));

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=15&size=800x400&maptype=mapnik&markers=${latitude},${longitude},red-pushpin`;

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

        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6 cursor-pointer group">
          <div className="h-[400px] w-full">
            {hasValidCoordinates ? (
              <div className="relative w-full h-full">
                <iframe
                  title="Carte"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(longitude) - 0.005}%2C${Number(latitude) - 0.005}%2C${Number(longitude) + 0.005}%2C${Number(latitude) + 0.005}&layer=mapnik&marker=${latitude}%2C${longitude}`}
                  className="rounded-2xl"
                />
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="absolute inset-0 z-10 block cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-900">Ouvrir dans Google Maps</span>
                    </div>
                  </div>
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Coordonnées non disponibles
                  </h3>
                  <p className="text-gray-500">
                    La localisation exacte n'est pas disponible pour cette propriété.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
