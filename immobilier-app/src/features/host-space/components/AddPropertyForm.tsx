import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  MapPin, 
  Home, 
  Info, 
  Zap, 
  CheckCircle2, 
  Loader2,
  X,
  Wifi,
  Wind,
  ParkingCircle,
  Waves,
  Utensils,
  Tv,
  Users,
  Bed,
  Bath,
  Building2,
  Maximize2,
  Clock,
  Navigation
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/utils/toast';
import { addProperty } from '../api/propertiesApi';
import { LocationPicker } from './LocationPicker';


const STEPS = [
  { id: 'basic', title: 'Informations', icon: Info },
  { id: 'location', title: 'Localisation', icon: MapPin },
  { id: 'details', title: 'Détails', icon: Home },
  { id: 'features', title: 'Équipements', icon: Zap },
  { id: 'images', title: 'Photos', icon: Upload },
];

// Backend codes from ReferenceDataSeeder
const CATEGORIES = [
  { label: 'Appartement', value: 'apartment' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
  { label: 'Commercial', value: 'commercial' },
];
const ETATS = [
  { label: 'Neuf', value: 'new' },
  { label: 'Bon état', value: 'good' },
  { label: 'À rénover', value: 'to-renovate' },
];
const TRANSACTIONS = [
  { label: 'Vente', value: 'sale' },
  { label: 'Location', value: 'rent' },
];

// Features use integer IDs (must match database IDs in features table)
const AVAILABLE_FEATURES = [
  { id: 1, name: 'Wi-Fi', icon: Wifi },
  { id: 2, name: 'Climatisation', icon: Wind },
  { id: 3, name: 'Parking', icon: ParkingCircle },
  { id: 4, name: 'Piscine', icon: Waves },
  { id: 5, name: 'Cuisine équipée', icon: Utensils },
  { id: 6, name: 'Télévision', icon: Tv },
  { id: 7, name: 'Ascenseur', icon: Building2 },
  { id: 8, name: 'Sécurité 24/7', icon: Users },
];

export const AddPropertyForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [featuresList, setFeaturesList] = useState<any[]>([]);
  const [apiCategories, setApiCategories] = useState<any[]>([]);
  const [apiTransactions, setApiTransactions] = useState<any[]>([]);
  const [apiEtats, setApiEtats] = useState<any[]>([]);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const { success, error } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      category: 'apartment',
      etat: 'new',
      typeTransaction: 'sale',
      nbRooms: 1,
      nbBathrooms: 1,
      nbEtages: 1,
      city: 1, // Agadir city ID
      latitude: 30.4278,
      longitude: -9.5981,
      features: []
    }
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        // Fetch cities
        const cityRes = await fetch(`${baseUrl.replace('/app', '')}/cities`);
        const cityData = await cityRes.json();
        if (cityData.success) setCities(cityData.data);

        // Fetch features
        const featRes = await fetch(`${baseUrl}/features`);
        const featData = await featRes.json();
        if (featData.success) setFeaturesList(featData.data);

        // Fetch categories
        const catRes = await fetch(`${baseUrl}/realestates/categories`);
        const catData = await catRes.json();
        if (catData.success) setApiCategories(catData.data);

        // Fetch transactions
        const transRes = await fetch(`${baseUrl}/realestates/transaction-types`);
        const transData = await transRes.json();
        if (transData.success) setApiTransactions(transData.data);

        // Fetch states (etats)
        const etatRes = await fetch(`${baseUrl}/realestates/etats`);
        const etatData = await etatRes.json();
        if (etatData.success) setApiEtats(etatData.data);

      } catch (err) {
        console.error("Failed to fetch metadata", err);
      }
    };
    fetchMetadata();
  }, []);

  const watchValues = watch();

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const detectLocation = () => {
    setIsDetectingLocation(true);
    setLocationDenied(false);

    if (!("geolocation" in navigator)) {
      setIsDetectingLocation(false);
      error("Non supporté", "Votre navigateur ne supporte pas la géolocalisation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.longitude);
        setIsDetectingLocation(false);
        setLocationDenied(false);
        success("Position détectée !", "La carte a été centrée sur votre position.");
      },
      (err) => {
        setIsDetectingLocation(false);
        // Always fall back to Agadir
        setValue('latitude', 30.4278);
        setValue('longitude', -9.5981);
        if (err.code === 1) {
          setLocationDenied(true); // Show inline guide
        } else {
          error("Erreur GPS", "Signal GPS indisponible. Carte centrée sur Agadir.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const toggleFeature = (featureId: number) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(f => f !== featureId)
      : [...selectedFeatures, featureId];
    setSelectedFeatures(newFeatures);
    setValue('features', newFeatures);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...images, ...newFiles].slice(0, 10);
      setImages(updatedFiles);
      setValue('images', updatedFiles);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews].slice(0, 10));
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
    setValue('images', updatedFiles);
    
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const onSubmit = async (data: any) => {
    try {
      if (images.length < 2) {
        error('Photos requises', 'Veuillez ajouter au moins 2 photos.');
        setCurrentStep(4);
        return;
      }

      await addProperty({
        ...data,
        city: data.city || 1,  // city ID required by backend
        images: images,
        features: selectedFeatures, // already numeric IDs
      });
      
      success('Bien soumis !', 'Votre propriété a été envoyée pour validation par l\'administrateur.');
      navigate('/host-space');
    } catch (err: any) {
      console.error('Submit error details:', err?.response?.data || err);
      
      const responseData = err?.response?.data;
      let errorMessage = 'Impossible d\'ajouter la propriété. Veuillez réessayer.';

      if (responseData?.error && typeof responseData.error === 'object') {
        // Extract first validation error: e.g. "The images field is required."
        const firstErrorKey = Object.keys(responseData.error)[0];
        const firstErrorMsg = responseData.error[firstErrorKey][0];
        errorMessage = `Erreur (${firstErrorKey}): ${firstErrorMsg}`;
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      }
      
      error('Erreur de validation', errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Stepper - Mobile Friendly */}
      <div className="mb-8 overflow-x-auto no-scrollbar py-4">
        <div className="flex justify-between items-center min-w-[500px] px-2">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <div 
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-xl ${
                      isActive ? 'bg-blue-600 text-white scale-110 rotate-3 shadow-blue-200' : 
                      isCompleted ? 'bg-green-500 text-white' : 'bg-white text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-7 w-7" /> : <Icon className="h-7 w-7" />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-grow h-1 mx-2 rounded-full transition-all duration-700 ${isCompleted ? 'bg-green-500' : 'bg-gray-100'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Card className="border-0 shadow-2xl shadow-blue-900/10 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
        <CardContent className="p-6 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* STEP 0: BASIC INFO */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                      <Info className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Informations de base</h2>
                      <p className="text-gray-500 font-medium">Commencez par les détails essentiels</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Titre de l'annonce</Label>
                      <Input 
                        {...register('title', { required: true })} 
                        placeholder="Ex: Villa Fleurie avec Vue Mer" 
                        className="h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-lg font-bold placeholder:text-gray-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</Label>
                      <Textarea 
                        {...register('description', { required: true })} 
                        placeholder="Qu'est-ce qui rend votre bien unique ?" 
                        className="min-h-[160px] rounded-[1.25rem] bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all text-md font-medium leading-relaxed p-5"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Prix (MAD)</Label>
                        <div className="relative">
                          <Input 
                            type="number" 
                            {...register('price', { required: true, valueAsNumber: true })} 
                            className="h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 focus:bg-white transition-all pl-6 font-black text-2xl"
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 font-black">MAD</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Surface (m²)</Label>
                        <div className="relative">
                          <Input 
                            type="number" 
                            {...register('surface', { required: true, valueAsNumber: true })} 
                            className="h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 focus:bg-white transition-all pl-6 font-black text-2xl"
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 font-black">m²</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 1: LOCATION */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100">
                        <MapPin className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">Emplacement</h2>
                        <p className="text-gray-500 font-medium">Choisissez l'emplacement sur la carte</p>
                      </div>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                      className="rounded-2xl h-12 px-6 border-gray-100 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all gap-2"
                    >
                      {isDetectingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                      Ma position
                    </Button>
                  </div>

                  {/* Location Permission Denied Guide */}
                  {locationDenied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-600 font-black text-lg">!</div>
                        <div>
                          <p className="font-black text-amber-900">Accès à la position bloqué</p>
                          <p className="text-sm text-amber-700 font-medium mt-1">Pour activer "Ma position", autorisez la localisation dans votre navigateur :</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white rounded-2xl p-4 text-center border border-amber-100">
                          <p className="text-2xl mb-2">🔒</p>
                          <p className="text-xs font-black text-gray-700">1. Cliquez sur l'icône verrou dans la barre d'adresse</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center border border-amber-100">
                          <p className="text-2xl mb-2">📍</p>
                          <p className="text-xs font-black text-gray-700">2. Sélectionnez "Localisation" et choisissez "Autoriser"</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center border border-amber-100">
                          <p className="text-2xl mb-2">🔄</p>
                          <p className="text-xs font-black text-gray-700">3. Rechargez la page puis réessayez</p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-600 font-bold text-center">💡 Alternative : utilisez la <strong>barre de recherche</strong> sur la carte pour trouver votre adresse</p>
                    </motion.div>
                  )}
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Adresse complète</Label>
                      <Input 
                        {...register('address', { required: true })} 
                        placeholder="N°, Rue, Quartier..." 
                        className="h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 focus:bg-white transition-all text-lg font-bold"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Ville</Label>
                      <select 
                        {...register('city', { required: true, valueAsNumber: true })}
                        className="w-full h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 font-bold px-6 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      >
                        <option value="">Sélectionner une ville...</option>
                        {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                      </select>
                    </div>

                    <LocationPicker 
                      lat={watchValues.latitude} 
                      lng={watchValues.longitude} 
                      onChange={(lat, lng) => {
                        setValue('latitude', lat);
                        setValue('longitude', lng);
                      }} 
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Latitude</p>
                        <p className="text-lg font-black text-gray-900 tracking-tight">{watchValues.latitude.toFixed(6)}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Longitude</p>
                        <p className="text-lg font-black text-gray-900 tracking-tight">{watchValues.longitude.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: DETAILS */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                      <Home className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Caractéristiques</h2>
                      <p className="text-gray-500 font-medium">Types et dimensions du bien</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Type de bien</Label>
                      <select 
                        {...register('category')}
                        className="w-full h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 font-bold px-4 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      >
                        {apiCategories.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Transaction</Label>
                      <select 
                        {...register('typeTransaction')}
                        className="w-full h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 font-bold px-4 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      >
                        {apiTransactions.map(t => <option key={t.value} value={t.value}>{t.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">État du bien</Label>
                      <select 
                        {...register('etat')}
                        className="w-full h-16 rounded-[1.25rem] bg-gray-50/50 border-gray-100 font-bold px-4 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      >
                        {apiEtats.map(e => <option key={e.value} value={e.value}>{e.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Bed, name: 'Chambres', key: 'nbRooms' },
                      { icon: Bath, name: 'S. Bain', key: 'nbBathrooms' },
                      { icon: Building2, name: 'Étages', key: 'nbEtages' }
                    ].map((item) => (
                      <div key={item.key} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm text-center">
                        <item.icon className="h-6 w-6 mx-auto mb-3 text-gray-400" />
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            type="button" 
                            onClick={() => setValue(item.key, Math.max(0, (watchValues[item.key] || 0) - 1))}
                            className="h-8 w-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold"
                          >-</button>
                          <span className="font-black text-xl min-w-[20px]">{watchValues[item.key] || 0}</span>
                          <button 
                            type="button" 
                            onClick={() => setValue(item.key, (watchValues[item.key] || 0) + 1)}
                            className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center font-bold"
                          >+</button>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase mt-2">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FEATURES */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Équipements</h2>
                      <p className="text-gray-500 font-medium">Sélectionnez les commodités incluses</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {featuresList.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFeature(feature.id)}
                          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                            isSelected 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 rotate-1' 
                              : 'bg-gray-50/50 border-gray-100 text-gray-400 hover:border-blue-100 hover:bg-white'
                          }`}
                        >
                           {/* Add a default icon or mapping if icon name is known, otherwise use a generic one */}
                           <Zap className={`h-8 w-8 ${isSelected ? 'animate-bounce-slow' : ''}`} />
                           <span className="text-xs font-black uppercase tracking-wider">{feature.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: IMAGES */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100">
                      <Upload className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Photos</h2>
                      <p className="text-gray-500 font-medium">Jusqu'à 10 photos en haute qualité</p>
                    </div>
                  </div>

                  <div 
                    className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 text-center hover:border-blue-200 transition-all cursor-pointer bg-gray-50/30 group relative overflow-hidden"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <input 
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div className="relative z-10">
                      <div className="h-24 w-24 bg-white rounded-3xl shadow-lg border border-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                        <Upload className="h-10 w-10 text-blue-600" />
                      </div>
                      <p className="text-2xl font-black text-gray-900">Ajouter les photos</p>
                      <p className="text-sm text-gray-400 font-medium mt-2">Cliquez pour parcourir vos fichiers</p>
                    </div>
                  </div>

                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {previews.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden group shadow-md">
                          <img src={url} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                              className="h-12 w-12 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-red-500 transition-colors"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                          {idx === 0 && (
                            <div className="absolute bottom-2 left-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg shadow-lg">
                              Couverture
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex flex-col md:flex-row gap-4 pt-10 border-t border-gray-100">
              <div className="flex-1 flex gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="h-16 px-8 rounded-2xl font-black text-gray-400 hover:text-gray-900 transition-all flex-1 md:flex-none border border-transparent hover:border-gray-100"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Précédent
                </Button>
              </div>

              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black shadow-2xl shadow-blue-500/40 text-lg group flex-1 md:flex-none"
                >
                  Suivant
                  <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 px-12 rounded-2xl bg-green-500 hover:bg-green-600 font-black shadow-2xl shadow-green-500/40 text-lg flex-1 md:flex-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Soumission...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-6 w-6" />
                      Soumettre pour validation
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-8">
              Étape {currentStep + 1} sur {STEPS.length} • {STEPS[currentStep].title}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

