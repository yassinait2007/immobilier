import React from 'react';
import { Address, getFullAddress, getCityName, getRegionName, getCountryName } from '@/types/Address';

interface AddressDisplayProps {
  address: Address;
  format?: 'full' | 'city' | 'region' | 'country' | 'short' | 'long';
  className?: string;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({ 
  address, 
  format = 'full', 
  className = '' 
}) => {
  const renderAddress = () => {
    switch (format) {
      case 'full':
        return getFullAddress(address);
      case 'city':
        return getCityName(address);
      case 'region':
        return getRegionName(address);
      case 'country':
        return getCountryName(address);
      case 'short':
        return `${getCityName(address)}, ${getRegionName(address)}`;
      case 'long':
        return `${address.address}, ${getCityName(address)}, ${getRegionName(address)}, ${getCountryName(address)}`;
      default:
        return getFullAddress(address);
    }
  };

  return <span className={className}>{renderAddress()}</span>;
};

interface AddressInputSelectorProps {
  regionId: number;
  cityId: number;
  regions: Array<{ id: number; name: string }>;
  cities: Array<{ id: number; name: string }>;
  onRegionChange: (regionId: number) => void;
  onCityChange: (cityId: number) => void;
  loadingCities?: boolean;
  errors?: {
    regionId?: string;
    cityId?: string;
  };
  required?: boolean;
  disabled?: boolean;
}

export const AddressInputSelector: React.FC<AddressInputSelectorProps> = ({
  regionId,
  cityId,
  regions,
  cities,
  onRegionChange,
  onCityChange,
  loadingCities = false,
  errors = {},
  required = false,
  disabled = false
}) => {
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRegionId = parseInt(e.target.value, 10) || 0;
    onRegionChange(newRegionId);
    // Reset city when region changes
    if (cityId !== 0) {
      onCityChange(0);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCityId = parseInt(e.target.value, 10) || 0;
    onCityChange(newCityId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Région {required && '*'}
        </label>
        <select
          value={regionId}
          onChange={handleRegionChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
            errors.regionId ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={disabled}
          required={required}
        >
          <option value={0}>Sélectionnez une région</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        {errors.regionId && (
          <p className="text-red-600 text-sm mt-1">{errors.regionId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ville {required && '*'}
        </label>
        <select
          value={cityId}
          onChange={handleCityChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
            errors.cityId ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={disabled || !regionId || loadingCities}
          required={required}
        >
          <option value={0}>
            {loadingCities ? "Chargement..." : "Sélectionnez une ville"}
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.cityId && (
          <p className="text-red-600 text-sm mt-1">{errors.cityId}</p>
        )}
      </div>
    </div>
  );
};

export default AddressDisplay;
