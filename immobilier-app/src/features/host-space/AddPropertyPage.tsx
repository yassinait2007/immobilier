import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AddPropertyForm } from './components/AddPropertyForm';

export const AddPropertyPage = () => {
  const navigate = useNavigate();

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
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Ajouter un nouveau bien</h1>
                <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-gray-400">Remplissez les détails pour publier votre annonce sur ImmobilierHost.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        <AddPropertyForm />
      </main>
    </div>
  );
};
