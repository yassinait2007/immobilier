import { Home, ArrowRight } from "lucide-react";

interface HeroContentProps {
  onExploreProperties: () => void;
  onLearnMore: () => void;
}

const HeroContent = ({ onExploreProperties, onLearnMore }: HeroContentProps) => {
  const heroContent = {
    title: "Trouvez Votre Maison de Rêve",
    subtitle: "Découvrez des propriétés exceptionnelles dans les meilleurs quartiers du Maroc",
    stats: [
      { number: "10,000+", label: "Propriétés" },
      { number: "500+", label: "Clients Satisfaits" },
      { number: "50+", label: "Villes" }
    ]
  };

  return (
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              <span className="block">
                {heroContent.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed max-w-2xl drop-shadow-lg">
              {heroContent.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {heroContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-gray-200 font-medium drop-shadow-md">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <button 
              onClick={onExploreProperties}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <Home className="w-5 h-5" />
              <span>Explorer les Propriétés</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={onLearnMore}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105"
            >
              En Savoir Plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;