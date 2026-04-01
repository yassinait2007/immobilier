// Category-specific filter types
export interface FilterState {
  selectedCategory: string;
  selectedCity: string;
  selectedState: string;
  selectedFeatures: number[];
  checkinDate: Date | undefined;
  checkoutDate: Date | undefined;
  currentPage: number;
}

export interface FilterActions {
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onFeatureToggle: (featureId: number) => void;
  onCheckinChange: (date: Date | undefined) => void;
  onCheckoutChange: (date: Date | undefined) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

export interface URLFilters {
  category?: string;
  city?: string;
  state?: string;
  features?: number[];
  checkin?: string | null;
  checkout?: string | null;
  page?: number;
}
