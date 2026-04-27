import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EditPropertyForm } from './components/EditPropertyForm';
import apiClient from '@/api/apiClient';

export const EditPropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await apiClient.get(`/realestates/${id}`);
        setProperty(response.data.data);
      } catch (err) {
        console.error("Failed to fetch property for editing", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-100 py-6 px-8 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/host-space')}
              className="h-12 w-12 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 text-gray-400 hover:text-blue-600 transition-all"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Modifier le bien</h1>
                <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-gray-400">Mettez à jour les informations de votre annonce.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : property ? (
          <EditPropertyForm property={property} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-400">Propriété introuvable.</p>
            <Button onClick={() => navigate('/host-space')} className="mt-4">Retour au tableau de bord</Button>
          </div>
        )}
      </main>
    </div>
  );
};
