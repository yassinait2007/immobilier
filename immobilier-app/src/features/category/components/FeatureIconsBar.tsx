"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "@/styles/features-icons.css";
import { Feature } from "@/types/property";

interface FeatureIconsBarProps {
  features: Feature[];
  selectedFeatures: number[];
  onFeatureToggle: (featureId: number) => void;
}

const FeatureIconsBar = ({
  features,
  selectedFeatures,
  onFeatureToggle,
}: FeatureIconsBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);

      const handleResize = () => {
        setTimeout(checkScrollPosition, 100);
      };
      window.addEventListener("resize", handleResize);

      setTimeout(checkScrollPosition, 100);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [features]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 250;
    const currentScroll = scrollContainerRef.current.scrollLeft;

    scrollContainerRef.current.scrollTo({
      left:
        direction === "left"
          ? Math.max(0, currentScroll - scrollAmount)
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });

    setTimeout(checkScrollPosition, 300);
  };

  return (
    <div className="relative mb-8 w-full">
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-200 shadow-sm px-2 py-4 relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 z-30"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-2 px-6 py-2 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {features.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);

            return (
              <div
                key={feature.id}
                className={`
                  group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 
                  min-w-[75px] max-w-[75px] h-20 rounded-xl border-2 px-2 py-2 hover:scale-105 flex-shrink-0
                  hover:z-10 relative
                  ${
                    isSelected
                      ? "bg-cyan-50 border-cyan-500 text-cyan-700 scale-105 z-10 shadow-md"
                      : "bg-white hover:bg-cyan-50 border-gray-200 hover:border-cyan-300 text-gray-700"
                  }
                `}
                onClick={() => onFeatureToggle(feature.id)}
              >
                <div
                  className={`
                    flex items-center justify-center w-7 h-7 rounded-lg mb-1 transition-all duration-300
                    ${
                      isSelected
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-100 group-hover:bg-cyan-100 text-gray-600 group-hover:text-cyan-600"
                    }
                  `}
                >
                  <i className={`${feature.icon} text-xs`}></i>
                </div>

                <span
                  className={`
                    text-[10px] font-medium text-center leading-tight w-full truncate transition-colors duration-300
                    ${
                      isSelected
                        ? "text-cyan-700 font-semibold"
                        : "text-gray-700 group-hover:text-cyan-700"
                    }
                  `}
                  title={feature.name}
                >
                  {feature.name}
                </span>
              </div>
            );
          })}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 z-30"
            style={{ top: "50%", transform: "translateY(-50%)" }}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeatureIconsBar;
