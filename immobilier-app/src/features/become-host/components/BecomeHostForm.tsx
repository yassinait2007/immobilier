import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/loading';
import { useBecomeHostData, useBecomeHostActions } from '../hooks';
import {
  BecomeHostError,
  BecomeHostSuccess,
  PersonalInfoSection,
  LocationSection,
  DocumentsSection,
} from './';

const BecomeHostForm: React.FC = () => {
  const {
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
  } = useBecomeHostData();

  const { loading, success, error, handleSubmit } = useBecomeHostActions();

  if (success) {
    return <BecomeHostSuccess />;
  }

  const handleRibChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[^0-9\s]/g, '');
    const numbersOnly = cleanValue.replace(/\s/g, '');
    if (numbersOnly.length <= 24) {
      handleInputChange({ target: { name, value: cleanValue } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData, phoneNumber, files, setErrors);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Devenez hôte</h1>
            <p className="mt-2 text-gray-600">
              Rejoignez notre communauté d'hôtes et commencez à partager votre propriété avec des voyageurs du monde entier.
            </p>
          </div>

          <form onSubmit={onSubmit} className="px-8 py-6 space-y-6">
            <BecomeHostError error={error} />

            <PersonalInfoSection
              phoneNumber={phoneNumber}
              onPhoneChange={handlePhoneChange}
              rib={formData.rib}
              onRibChange={handleRibChange}
              errors={errors}
            />

            <LocationSection
              formData={formData}
              regions={regions}
              cities={cities}
              loadingCities={loadingCities}
              onSelectChange={handleSelectChange}
              onInputChange={handleInputChange}
              errors={errors}
            />

            <DocumentsSection
              files={files}
              onFileChange={handleFileChange}
              errors={errors}
            />

            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <ButtonLoading message="Traitement en cours..." />
                ) : (
                  'Soumettre ma candidature'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostForm;
