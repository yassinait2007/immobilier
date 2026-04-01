export interface Country {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
  country: Country;
}

export interface City {
  id: number;
  name: string;
  region: Region;
}

export interface Address {
  address: string;
  city: City;
}

// Legacy interface for backward compatibility during migration
export interface LegacyAddress {
  country: string;
  region: string;
  city: string;
  address: string;
}

// Utility type for API requests that might still use the old format
export interface AddressCreateRequest {
  address: string;
  cityId: number;
  regionId: number;
  countryId: number;
}

// Utility functions to work with addresses
export const getFullAddress = (address: Address): string => {
  return `${address.address}, ${address.city.name}, ${address.city.region.name}, ${address.city.region.country.name}`;
};

export const getCountryName = (address: Address): string => {
  return address.city.region.country.name;
};

export const getRegionName = (address: Address): string => {
  return address.city.region.name;
};

export const getCityName = (address: Address): string => {
  return address.city.name;
};

export const getAddressString = (address: Address): string => {
  return address.address;
};
