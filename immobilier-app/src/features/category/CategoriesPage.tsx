"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { 
  PropertyFilters, 
  FeatureIconsBar, 
  PageHeader, 
  PropertyGrid 
} from "./components";
import { useFilters, useUrlSync } from "./hooks";
import { getPageTitle, getPageDescription, isValidTransactionType } from "./utils";
import "../../styles/features-icons.css";

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  
  // Validate the type parameter
  if (!typeParam || !isValidTransactionType(typeParam)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Paramètre manquant</AlertTitle>
              <AlertDescription>
                Le paramètre 'type' est requis dans l'URL. Veuillez spécifier un type de transaction valide :
                <ul className="mt-2 list-disc list-inside">
                  <li>rent-long (location long terme)</li>
                  <li>rent-short (location court terme)</li>
                  <li>selle (vente)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    );
  }
  
  const transactionType = typeParam;
  
  const { updateURL, readFiltersFromURL } = useUrlSync();
  const filters = useFilters(transactionType);

  // Sync with URL on mount and URL changes
  useEffect(() => {
    const urlFilters = readFiltersFromURL();
    filters.updateFiltersFromURL(urlFilters);
  }, [searchParams]);

  // Apply filters when dependencies change
  useEffect(() => {
    if (!filters.initialLoading) {
      filters.applyFilters();
    }
  }, [
    transactionType,
    filters.currentPage,
    filters.selectedCategory,
    filters.selectedCity,
    filters.selectedState,
    filters.selectedFeatures,
    filters.checkinDate,
    filters.checkoutDate,
    filters.initialLoading,
  ]);

  // Scroll to top when transaction type changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [transactionType]);

  // Filter change handlers with URL sync
  const handleCategoryChange = (value: string) => {
    filters.setSelectedCategory(value);
    filters.setCurrentPage(1);
    updateURL({ category: value, page: 1 });
  };

  const handleCityChange = (value: string) => {
    filters.setSelectedCity(value);
    filters.setCurrentPage(1);
    updateURL({ city: value, page: 1 });
  };

  const handleStateChange = (value: string) => {
    filters.setSelectedState(value);
    filters.setCurrentPage(1);
    updateURL({ state: value, page: 1 });
  };

  const handleCheckinChange = (date: Date | undefined) => {
    filters.setCheckinDate(date);
    filters.setCurrentPage(1);
    updateURL({ checkin: date ? date.toISOString().split('T')[0] : null, page: 1 });
  };

  const handleCheckoutChange = (date: Date | undefined) => {
    filters.setCheckoutDate(date);
    filters.setCurrentPage(1);
    updateURL({ checkout: date ? date.toISOString().split('T')[0] : null, page: 1 });
  };

  const handleFeatureToggle = (featureId: number) => {
    const newFeatures = filters.selectedFeatures.includes(featureId)
      ? filters.selectedFeatures.filter((id) => id !== featureId)
      : [...filters.selectedFeatures, featureId];
    
    filters.setSelectedFeatures(newFeatures);
    filters.setCurrentPage(1);
    updateURL({ features: newFeatures, page: 1 });
  };

  const handlePageChange = (page: number) => {
    filters.setCurrentPage(page);
    updateURL({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    filters.resetFilters();
    updateURL({ 
      category: "all", 
      city: "all", 
      state: "all", 
      features: [], 
      checkin: null, 
      checkout: null, 
      page: 1 
    });
  };

  if (filters.initialLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PageHeader 
        title={getPageTitle(transactionType)}
        description={getPageDescription(transactionType)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PropertyFilters
          categories={filters.categories}
          cities={filters.cities}
          propertyStates={filters.propertyStates}
          selectedCategory={filters.selectedCategory}
          selectedCity={filters.selectedCity}
          selectedState={filters.selectedState}
          checkinDate={filters.checkinDate}
          checkoutDate={filters.checkoutDate}
          onCategoryChange={handleCategoryChange}
          onCityChange={handleCityChange}
          onStateChange={handleStateChange}
          onCheckinChange={handleCheckinChange}
          onCheckoutChange={handleCheckoutChange}
          onApplyFilters={filters.applyFilters}
        />

        <FeatureIconsBar
          features={filters.features}
          selectedFeatures={filters.selectedFeatures}
          onFeatureToggle={handleFeatureToggle}
        />

        <PropertyGrid
          properties={filters.properties}
          loading={filters.loading}
          currentPage={filters.currentPage}
          totalPages={filters.totalPages}
          onPageChange={handlePageChange}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
