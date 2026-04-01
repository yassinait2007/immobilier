import { useState, useEffect } from "react";
import { 
  fetchCategories,
  fetchCities,
  fetchEtats,
  fetchFeatures,
  fetchPropertiesWithFilters,
} from "../api/CategoryApi";
import type { Category, Etat, Feature, Property } from "@/types/property";
import type { City } from "@/types/Address";

export const useFilters = (transactionType: string) => {
  // Filter options data
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [propertyStates, setPropertyStates] = useState<Etat[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  
  // Filter state
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [checkinDate, setCheckinDate] = useState<Date | undefined>(undefined);
  const [checkoutDate, setCheckoutDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Results state
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const perPage = 20;

  // Load filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, cityRes, stateRes, featRes] = await Promise.all([
          fetchCategories(),
          fetchCities(),
          fetchEtats(),
          fetchFeatures(),
        ]);

        setCategories(catRes.data || []);
        setCities(cityRes.data || []);
        setPropertyStates(stateRes.data || []);
        setFeatures(featRes.data || []);
      } catch (err) {
        console.error("Error loading filters", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchFilters();
  }, []);

  // Apply filters and fetch properties
  const applyFilters = async () => {
    setLoading(true);
    try {
      const filters = {
        typeTransaction: transactionType,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        city: selectedCity !== "all" ? Number(selectedCity) : undefined,
        etat: selectedState !== "all" ? selectedState : undefined,
        features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
        checkin: checkinDate ? checkinDate.toISOString().split('T')[0] : undefined,
        checkout: checkoutDate ? checkoutDate.toISOString().split('T')[0] : undefined,
        page: currentPage,
        perPage: perPage,
      };

      const response = await fetchPropertiesWithFilters(filters);
      setProperties(response.data.items || []);
      setTotalPages(response.data.pagination?.last_page || 1);
    } catch (err) {
      console.error("Failed to fetch filtered properties", err);
    } finally {
      setLoading(false);
    }
  };

  // Update filter state from URL params
  const updateFiltersFromURL = (urlFilters: any) => {
    setSelectedCategory(urlFilters.category);
    setSelectedCity(urlFilters.city);
    setSelectedState(urlFilters.state);
    setCurrentPage(urlFilters.page);
    setSelectedFeatures(urlFilters.features);
    setCheckinDate(urlFilters.checkin);
    setCheckoutDate(urlFilters.checkout);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedCity("all");
    setSelectedState("all");
    setSelectedFeatures([]);
    setCheckinDate(undefined);
    setCheckoutDate(undefined);
    setCurrentPage(1);
  };

  return {
    // Filter options
    categories,
    cities,
    propertyStates,
    features,
    
    // Filter state
    selectedFeatures,
    selectedCategory,
    selectedCity,
    selectedState,
    checkinDate,
    checkoutDate,
    currentPage,
    
    // Results
    properties,
    totalPages,
    loading,
    initialLoading,
    
    // Actions
    setSelectedFeatures,
    setSelectedCategory,
    setSelectedCity,
    setSelectedState,
    setCheckinDate,
    setCheckoutDate,
    setCurrentPage,
    applyFilters,
    updateFiltersFromURL,
    resetFilters,
  };
};
