import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Home, 
  MapPin, 
  User, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/utils/toast';
import { fetchPendingAnounces, approveAnounce, refuseAnounce } from '../api/anouncesApi';
import { Property } from '@/types/property';

export const PropertyApprovalList = () => {
  const { success, info, error: toastError } = useToast();
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadPendingAnounces = async () => {
    try {
      setLoading(true);
      const response = await fetchPendingAnounces();
      // Handle response structure (usually response.data since it's from successResponse)
      setPendingProperties(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingAnounces();
  }, []);

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await approveAnounce(id);
      success("Bien approuvé !", "La propriété est maintenant visible par tous.");
      setPendingProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      toastError("Erreur", "Impossible d'approuver l'annonce.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: number) => {
    setProcessingId(id);
    try {
      await refuseAnounce(id);
      info("Bien rejeté", "Le propriétaire sera informé de la décision.");
      setPendingProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      toastError("Erreur", "Impossible de rejeter l'annonce.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ShieldAlert className="h-7 w-7 text-orange-500" />
            Validation des Biens
          </h2>
          <p className="text-sm text-gray-400 font-medium">Modération des nouvelles annonces soumises.</p>
        </div>
        <Badge className="bg-orange-100 text-orange-600 border-orange-200 px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest">
          {pendingProperties.length} En attente
        </Badge>
      </div>

      {pendingProperties.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center">
          <div className="h-24 w-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">Tout est à jour !</h3>
          <p className="text-gray-400 font-medium mt-2">Aucune propriété en attente de validation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {pendingProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-xl shadow-gray-200/40 rounded-[2.5rem] bg-white group ring-1 ring-gray-100">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Image Preview */}
                      <div className="w-full md:w-72 h-56 md:h-auto overflow-hidden relative">
                        <img 
                          src={property.images?.[0]?.url || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80'} 
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                           <Badge className="bg-white/90 backdrop-blur-md text-gray-900 font-black border-0">
                              {property.category?.name || 'Bien'}
                           </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-black text-gray-900 line-clamp-1">{property.title}</h3>
                            <span className="text-xl font-black text-blue-600">{property.price_per_night || property.price} <span className="text-xs text-gray-400">MAD</span></span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              {property.city?.name || 'Agadir'}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold underline decoration-blue-200 underline-offset-4">
                              <User className="h-3.5 w-3.5 text-gray-400" />
                              {property.owner?.firstName || 'Propriétaire'} {property.owner?.lastName || ''}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold">
                              <Clock className="h-3.5 w-3.5 text-gray-400" />
                              Soumis aujourd'hui
                            </div>
                          </div>

                          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed font-medium mb-6">
                            {property.description}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            disabled={processingId === property.id}
                            onClick={() => handleApprove(property.id)}
                            className="flex-1 h-16 rounded-2xl bg-green-500 hover:bg-green-600 font-black text-lg gap-2 shadow-lg shadow-green-500/20"
                          >
                            {processingId === property.id ? <Loader2 className="h-6 w-6 animate-spin" /> : <Check className="h-6 w-6" />}
                            APPROUVER (OK)
                          </Button>
                          <Button 
                            variant="ghost" 
                            disabled={processingId === property.id}
                            onClick={() => handleReject(property.id)}
                            className="flex-1 h-16 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-black text-lg gap-2 transition-all"
                          >
                            <X className="h-6 w-6" />
                            REJETER (NO)
                          </Button>
                          <Button variant="outline" className="h-16 w-16 rounded-2xl border-gray-100 text-gray-400 hover:text-blue-600 flex items-center justify-center">
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
