"use client";

import { useHomeData, useHomeNavigation } from "./hooks";
import {
  HeroSlider,
  HomeHeader,
  CategoryNavigationButtons,
  PropertySection,
  RecommendationSection,
  HomeCallToAction
} from "./components";

const HomePage = () => {
  const {
    longTermProperties,
    shortTermProperties,
    forSaleProperties,
    loading,
    error
  } = useHomeData();

  const {
    handleGetStarted,
    handleContactUs,
    handleExploreProperties,
    handleLearnMore
  } = useHomeNavigation();

  if (error) {
    console.error("Error loading home data:", error);
  }

  return (
    <div className="min-h-screen">
      <HeroSlider 
        onExploreProperties={handleExploreProperties}
        onLearnMore={handleLearnMore}
      />

      <div className="bg-white">
        <HomeHeader />

        <div id="categories-section" className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryNavigationButtons />
          </div>
        </div>

        <div className="bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="py-12">
              <PropertySection
                title="Location à Court Terme"
                subtitle="Séjours parfaits pour vos vacances et voyages d'affaires"
                properties={shortTermProperties}
                loading={loading.shortTerm}
                transactionType="rent-short"
                gradient="from-primary-light to-primary"
              />
            </div>

            <div className="py-12">
              <PropertySection
                title="Location à Long Terme"
                subtitle="Trouvez votre nouveau chez-vous pour une vie confortable"
                properties={longTermProperties}
                loading={loading.longTerm}
                transactionType="rent-long"
                gradient="from-primary to-primary-light"
              />
            </div>

            <div className="py-12">
              <PropertySection
                title="Propriétés à Vendre"
                subtitle="Investissez dans votre futur avec nos opportunités exclusives"
                properties={forSaleProperties}
                loading={loading.forSale}
                transactionType="selle"
                gradient="from-primary-light to-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecommendationSection />
          </div>
        </div>

        <HomeCallToAction 
          onGetStarted={handleGetStarted}
          onContactUs={handleContactUs}
        />
      </div>
    </div>
  );
};

export default HomePage;