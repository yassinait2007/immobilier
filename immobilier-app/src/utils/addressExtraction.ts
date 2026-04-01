import { Address } from '@/types/Address';
import { getCitiesRequest } from '@/features/host-space/properties/api/propertyApi';

// Type guards for address structure detection
export const isNestedAddress = (address: any): address is Address => {
  return address &&
    typeof address === 'object' &&
    'city' in address &&
    address.city &&
    typeof address.city === 'object' &&
    'region' in address.city;
};

export const isLegacyAddress = (address: any): address is { country: string; region: string; city: string; address: string } => {
  return address &&
    typeof address === 'object' &&
    typeof address.region === 'string' &&
    typeof address.city === 'string';
};

// Address extraction utilities
export interface ExtractedAddressData {
  regionId: number;
  cityId: number;
  addressString: string;
  latitude?: number;
  longitude?: number;
}

export const extractAddressData = (property: any): ExtractedAddressData => {
  const defaultResult: ExtractedAddressData = {
    regionId: 0,
    cityId: 0,
    addressString: '',
    latitude: property.location?.latitude || property.latitude || 0,
    longitude: property.location?.longitude || property.longitude || 0,
  };

  if (!property.address) {
    return defaultResult;
  }

  // Handle new nested structure
  if (isNestedAddress(property.address)) {
    return {
      regionId: property.address.city.region?.id || 0,
      cityId: property.address.city.id || 0,
      addressString: property.address.address || '',
      latitude: property.location?.latitude || property.latitude || 0,
      longitude: property.location?.longitude || property.longitude || 0,
    };
  }

  // Handle legacy flat structure
  if (isLegacyAddress(property.address)) {
    return {
      regionId: 0, // Will need to be resolved by name lookup
      cityId: 0,   // Will need to be resolved by name lookup  
      addressString: property.address.address || '',
      latitude: property.location?.latitude || property.latitude || 0,
      longitude: property.location?.longitude || property.longitude || 0,
    };
  }

  return defaultResult;
};

// API utilities - simple async functions
export const loadCitiesForRegion = async (regionId: number): Promise<Array<{ id: number; name: string }>> => {
  try {
    const response = await getCitiesRequest(regionId);
    return response.data.data || [];
  } catch (err) {
    console.error('Failed to load cities for region:', err);
    throw new Error('Failed to load cities for region');
  }
};

// Legacy address name lookup utilities
export const findRegionIdByName = (regionName: string, regions: Array<{ id: number; name: string }>): number => {
  const matchingRegion = regions.find(region => 
    region.name.toLowerCase() === regionName.toLowerCase()
  );
  return matchingRegion?.id || 0;
};

export const findCityIdByName = (cityName: string, cities: Array<{ id: number; name: string }>): number => {
  const matchingCity = cities.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase()
  );
  return matchingCity?.id || 0;
};

// Legacy address resolution - pure async function
export const resolveLegacyAddress = async (
  regionName: string,
  cityName: string,
  regions: Array<{ id: number; name: string }>
): Promise<{ regionId: number; cityId: number }> => {
  if (!regionName || !cityName) {
    return { regionId: 0, cityId: 0 };
  }

  // Find region ID by name
  const regionId = findRegionIdByName(regionName, regions);
  if (regionId === 0) {
    console.warn(`Region not found: ${regionName}`);
    return { regionId: 0, cityId: 0 };
  }

  // Load cities for the region
  const cities = await loadCitiesForRegion(regionId);
  
  // Find city ID by name
  const cityId = findCityIdByName(cityName, cities);
  if (cityId === 0) {
    console.warn(`City not found: ${cityName} in region: ${regionName}`);
  }

  return { regionId, cityId };
};

// Legacy address resolution helper
export interface LegacyAddressResolver {
  regionName?: string;
  cityName?: string;
}

export const extractLegacyAddressNames = (property: any): LegacyAddressResolver => {
  if (!property.address || !isLegacyAddress(property.address)) {
    return {};
  }

  return {
    regionName: property.address.region,
    cityName: property.address.city,
  };
};

// Form data preparation utilities
export const prepareFormDataFromProperty = (property: any): {
  basicData: any;
  addressData: ExtractedAddressData;
  legacyNames: LegacyAddressResolver;
} => {
  const addressData = extractAddressData(property);
  const legacyNames = extractLegacyAddressNames(property);

  const basicData = {
    title: property.title || '',
    description: property.description || '',
    price: property.price || 0,
    surface: property.surface || 0,
    category: property.category?.value || '',
    etat: property.etat?.value || '',
    typeTransaction: property.typeTransaction?.value || '',
    tour360Url: property.tour360Url || undefined,
    nbRooms: property.nbRooms || 0,
    nbBathrooms: property.nbBathroom || 0,
    nbEtages: property.nbEtages || 0,
    etage: property.etage || 0,
    dateConstruction: property.dateConstruction || '',
    features: property.features?.map((f: any) => f.id.toString()) || [],
    existingImages: property.media || [],
  };

  return {
    basicData,
    addressData,
    legacyNames,
  };
};

// Address validation utilities
export const validateAddressData = (addressData: ExtractedAddressData): string[] => {
  const errors: string[] = [];

  if (addressData.regionId <= 0) {
    errors.push('La région est requise');
  }

  if (addressData.cityId <= 0) {
    errors.push('La ville est requise');
  }

  if (!addressData.addressString || addressData.addressString.trim().length < 10) {
    errors.push('L\'adresse doit contenir au moins 10 caractères');
  }

  return errors;
};
