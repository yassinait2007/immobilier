import { useState, useEffect } from 'react';
import { getRegionsRequest, getCitiesRequest } from '../api/becomeHostApi';
import { Region, City, FileTypes, BecomeHostFormState } from '@/types/becomeHost';

export const useBecomeHostData = () => {
  const [formData, setFormData] = useState<BecomeHostFormState>({
    city: 0,
    address: '',
    regionId: 0,
    rib: '',
  });
  
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [files, setFiles] = useState<FileTypes>({
    identityFront: null,
    identityBack: null,
    profile: null,
  });
  
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const response = await getRegionsRequest();
        setRegions(response.data.data || []);
      } catch (err) {
        console.error('Failed to load regions:', err);
      }
    };
    loadRegions();
  }, []);

  useEffect(() => {
    if (formData.regionId) {
      const loadCities = async () => {
        setLoadingCities(true);
        try {
          const response = await getCitiesRequest(formData.regionId);
          setCities(response.data.data || []);
        } catch (err) {
          console.error('Failed to load cities:', err);
        } finally {
          setLoadingCities(false);
        }
      };
      loadCities();
    } else {
      setCities([]);
      setFormData(prev => ({ ...prev, city: 0 }));
    }
  }, [formData.regionId]);

  const handleSelectChange = (name: string, value: string) => {
    const processedValue = (name === 'regionId' || name === 'city') 
      ? (value === '' ? 0 : parseInt(value, 10))
      : value;
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FileTypes) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value);
    if (errors.tel) {
      setErrors(prev => ({ ...prev, tel: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return {
    formData,
    phoneNumber,
    files,
    regions,
    cities,
    loadingCities,
    errors,
    setErrors,
    handleSelectChange,
    handleFileChange,
    handlePhoneChange,
    handleInputChange,
  };
};
