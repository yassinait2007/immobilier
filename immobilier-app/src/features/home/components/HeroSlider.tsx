"use client";

import React, { useEffect, useState } from "react";
import { fetchHomeImages } from "../api/homeApi";
import { PageLoading } from "@/components/ui/loading";
import HeroContent from "./HeroContent";

interface HeroSliderProps {
  onExploreProperties: () => void;
  onLearnMore: () => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onExploreProperties, onLearnMore }) => {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetchHomeImages();
        setHeroImages(res.data || []);
      } catch (err) {
        console.error("Failed to load home images", err);
        setHeroImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (loading) {
    return (
      <PageLoading 
        message="Chargement des images..." 
        description="Préparation de votre expérience" 
      />
    );
  }

  if (heroImages.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary-light/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>
        <HeroContent onExploreProperties={onExploreProperties} onLearnMore={onLearnMore} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms] ease-out"
              style={{
                transform: index === currentImageIndex ? "scale(1.1)" : "scale(1.05)"
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          </div>
        ))}
      </div>

      <HeroContent onExploreProperties={onExploreProperties} onLearnMore={onLearnMore} />

      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;