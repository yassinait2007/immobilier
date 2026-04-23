import React, { useEffect, useRef, useState } from 'react';

interface LocationPickerProps {
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ lat, lng, onChange }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setIsLoaded(true);
        return;
      }

      if (document.getElementById('leaflet-js')) {
        const interval = setInterval(() => {
          if (window.L) {
            setIsLoaded(true);
            clearInterval(interval);
          }
        }, 100);
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.crossOrigin = '';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setLoadError(true);
      document.head.appendChild(script);
    };

    loadLeaflet();

    const timer = setTimeout(() => {
      if (!window.L) setLoadError(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.L || mapInstance.current) return;

    const initMap = () => {
      try {
        mapInstance.current = window.L.map(mapRef.current, {
          zoomControl: false, // Moved to bottom right
          scrollWheelZoom: true
        }).setView([lat, lng], 13);
        
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap'
        }).addTo(mapInstance.current);

        window.L.control.zoom({
          position: 'bottomright'
        }).addTo(mapInstance.current);

        mapInstance.current.on('click', (e: any) => {
          const { lat, lng } = e.latlng;
          updateMarker(lat, lng);
          onChange(lat, lng);
        });

        updateMarker(lat, lng);

        setTimeout(() => {
          if (mapInstance.current) mapInstance.current.invalidateSize();
        }, 500);
      } catch (err) {
        setLoadError(true);
      }
    };

    const updateMarker = (newLat: number, newLng: number) => {
      if (!mapInstance.current || !window.L) return;

      if (markerInstance.current) {
        markerInstance.current.setLatLng([newLat, newLng]);
      } else {
        markerInstance.current = window.L.marker([newLat, newLng], { draggable: true }).addTo(mapInstance.current);
        markerInstance.current.on('dragend', (e: any) => {
          const position = markerInstance.current.getLatLng();
          onChange(position.lat, position.lng);
        });
      }
    };

    initMap();
  }, [isLoaded]);

  // Sync marker if props change
  useEffect(() => {
    if (markerInstance.current && mapInstance.current) {
      markerInstance.current.setLatLng([lat, lng]);
      mapInstance.current.panTo([lat, lng]);
    }
  }, [lat, lng]);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !window.L || !mapInstance.current) return;

    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat: newLat, lon: newLng } = data[0];
        const numLat = parseFloat(newLat);
        const numLng = parseFloat(newLng);
        
        mapInstance.current.setView([numLat, numLng], 15);
        if (markerInstance.current) {
          markerInstance.current.setLatLng([numLat, numLng]);
        }
        onChange(numLat, numLng);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  if (loadError) {
    return (
      <div className="w-full h-[450px] rounded-[3rem] bg-red-50 border-2 border-red-100 flex flex-col items-center justify-center p-12 text-center gap-6">
        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold text-2xl">!</div>
        <div>
          <h3 className="text-xl font-black text-red-900 uppercase">Échec de la carte</h3>
          <p className="text-sm text-red-600 font-bold max-w-sm mx-auto">La carte est bloquée par votre navigateur ou votre connexion.</p>
        </div>
        <button onClick={() => window.location.reload()} className="px-6 h-12 bg-red-600 text-white rounded-2xl font-black">RÉESSAYER</button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl bg-gray-50 flex flex-col">
      {/* Search Overlay - use div, NOT form (already inside a form) */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex gap-2">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
              placeholder="Rechercher une ville, une rue (ex: Agadir)..."
              className="w-full h-14 pl-12 pr-4 bg-white/95 backdrop-blur-xl border-0 rounded-2xl shadow-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {isSearching ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Rechercher"}
          </button>
        </div>
      </div>

      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-md z-20">
          <div className="flex flex-col items-center gap-4">
             <div className="h-16 w-16 border-[6px] border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Initialisation...</p>
          </div>
        </div>
      )}

      {/* Guide Overlay */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
        </span>
        <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">
           Cliquez n'importe où sur la carte
        </p>
      </div>
    </div>
  );
};

const Button = ({ children, onClick, className }: any) => (
  <button onClick={onClick} className={className}>{children}</button>
);
