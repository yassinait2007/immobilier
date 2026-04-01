import React, { useState, useEffect } from "react";
import { X, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloudPanoViewerProps {
  isOpen: boolean;
  onClose: () => void;
  tourUrl: string; // 360° tour URL (CloudPano or any platform)
  propertyTitle: string;
}

export const CloudPanoViewer: React.FC<CloudPanoViewerProps> = ({
  isOpen,
  onClose,
  tourUrl,
  propertyTitle,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const get360TourUrl = () => tourUrl;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleFullscreen = async () => {
    const container = document.getElementById("cloudpano-container");
    if (!container) return;

    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.log("Fullscreen not supported or denied");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
      <div 
        id="cloudpano-container"
        className="relative w-full h-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold mb-1">
                  Visite Virtuelle 360° - {propertyTitle}
                </h2>
                <p className="text-gray-300 text-sm">
                  Explorez chaque pièce en réalité virtuelle
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleFullscreen}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                title="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="w-12 h-12 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Chargement de la visite 360°</h3>
              <p className="text-sm text-gray-300">Préparation de l'expérience immersive...</p>
            </div>
          </div>
        )}

        <iframe
          src={get360TourUrl()}
          className="w-full h-full border-0"
          title={`Visite 360° - ${propertyTitle}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm animate-pulse">
          <p>Utilisez votre souris pour naviguer • Échap pour fermer</p>
        </div>
      </div>
    </div>
  );
};