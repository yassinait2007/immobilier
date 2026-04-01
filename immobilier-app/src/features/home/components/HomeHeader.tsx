import { siteConfig } from "@/config/siteConfig";

const HomeHeader = () => {
  return (
    <div className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text hover:text-transparent mb-6 leading-tight transition-all duration-300">
            {`Bienvenue chez ${siteConfig.website.name}`}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre partenaire de confiance pour trouver la propriété parfaite au Maroc. 
            Explorez notre sélection exclusive de biens immobiliers dans tout le royaume.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;