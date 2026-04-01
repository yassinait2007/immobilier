import React from 'react';
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Region, City, BecomeHostFormState } from '@/types/becomeHost';

interface LocationSectionProps {
  formData: BecomeHostFormState;
  regions: Region[];
  cities: City[];
  loadingCities: boolean;
  onSelectChange: (name: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  regions,
  cities,
  loadingCities,
  onSelectChange,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-cyan-600" />
        Localisation
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Région *
          </label>
          <Select
            value={formData.regionId > 0 ? formData.regionId.toString() : undefined}
            onValueChange={(value) => onSelectChange('regionId', value)}
          >
            <SelectTrigger className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
              errors.regionId ? 'border-red-500' : 'border-gray-300'
            }`}>
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id.toString()}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.regionId && (
            <p className="text-red-600 text-sm mt-1">{errors.regionId}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville *
          </label>
          <Select
            value={formData.city > 0 ? formData.city.toString() : undefined}
            onValueChange={(value) => onSelectChange('city', value)}
            disabled={!formData.regionId || loadingCities}
          >
            <SelectTrigger className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}>
              <SelectValue 
                placeholder={loadingCities ? "Chargement..." : "Sélectionnez une ville"} 
              />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse complète *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onInputChange}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Entrez votre adresse complète..."
          required
        />
        {errors.address && (
          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
        )}
      </div>
    </div>
  );
};
