import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface GoogleMapPickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
  height?: string;
  apiKey: string;
  error?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleMapPicker: React.FC<GoogleMapPickerProps> = ({
  latitude,
  longitude,
  onLocationChange,
  height = '400px',
  apiKey,
  error
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  // Default to Morocco (Agadir) if no coordinates provided
  const defaultLat = latitude || 30.4278;
  const defaultLng = longitude || -9.5981;

  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) return;

    try {
      // Create map
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: defaultLat, lng: defaultLng },
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Create marker
      const marker = new window.google.maps.Marker({
        position: { lat: defaultLat, lng: defaultLng },
        map: map,
        draggable: true,
        title: 'Localisation de la propriété',
      });

      // Add click listener to map
      map.addListener('click', (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        marker.setPosition({ lat, lng });
        onLocationChange(lat, lng);
      });

      // Add drag listener to marker
      marker.addListener('dragend', (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        onLocationChange(lat, lng);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setIsLoaded(true);
      setIsLoading(false);
    } catch (err) {
      setMapError('Erreur lors de l\'initialisation de la carte');
      setIsLoading(false);
    }
  }, [defaultLat, defaultLng, onLocationChange]);

  const loadGoogleMapsScript = useCallback(() => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Check if script already exists
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          initializeMap();
        }
      }, 100);
      return;
    }

    // Create unique callback name
    const callbackName = `initMap_${Date.now()}`;
    
    // Set global callback
    (window as any)[callbackName] = () => {
      initializeMap();
      delete (window as any)[callbackName];
    };

    // Load script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      setMapError('Erreur lors du chargement de Google Maps');
      setIsLoading(false);
      delete (window as any)[callbackName];
    };

    document.head.appendChild(script);
  }, [apiKey, initializeMap]);

  useEffect(() => {
    loadGoogleMapsScript();
  }, [loadGoogleMapsScript]);

  // Update marker position when props change
  useEffect(() => {
    if (isLoaded && markerRef.current && mapInstanceRef.current) {
      const newPosition = { lat: latitude, lng: longitude };
      markerRef.current.setPosition(newPosition);
      mapInstanceRef.current.setCenter(newPosition);
    }
  }, [latitude, longitude, isLoaded]);

  if (mapError || error) {
    return (
      <div className="border border-red-300 rounded-lg p-6 bg-red-50">
        <div className="flex items-center space-x-2 text-red-600">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">Erreur Google Maps</span>
        </div>
        <p className="text-red-600 text-sm mt-2">{mapError || error}</p>
        <p className="text-gray-600 text-sm mt-2">
          Vérifiez votre clé API Google Maps et que la facturation est activée.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h4 className="font-medium text-gray-900">Localisation sur la carte</h4>
        </div>
        {latitude && longitude && (
          <div className="text-sm text-gray-600">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </div>
        )}
      </div>

      <div 
        className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
        style={{ height }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Chargement de la carte...</span>
            </div>
          </div>
        )}
        
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: height }}
        />
        
        {isLoaded && (
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 max-w-xs">
            <p className="text-sm text-gray-600">
              <strong>Conseil:</strong> Cliquez sur la carte ou faites glisser le marqueur pour définir la localisation.
            </p>
          </div>
        )}
      </div>

      {latitude && longitude && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <p><strong>Coordonnées sélectionnées:</strong></p>
          <p>Latitude: {latitude.toFixed(6)}</p>
          <p>Longitude: {longitude.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapPicker;
