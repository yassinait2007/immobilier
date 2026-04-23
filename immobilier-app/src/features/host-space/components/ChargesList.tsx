import React, { useState, useEffect } from 'react';
import { fetchCharges, Charge, validateChargePayment } from '../api/chargesApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Receipt, Home, Calendar, CheckCircle2, AlertCircle, FileText, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { AddChargeModal } from './AddChargeModal';

interface ChargesListProps {
  realestateId?: number;
}

export const ChargesList: React.FC<ChargesListProps> = ({ realestateId }) => {
  const [charges, setCharges] = useState<Charge[]>(() => {
    if (!realestateId) {
      const saved = localStorage.getItem('host_charges_cache');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [loading, setLoading] = useState(charges.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCharges = async () => {
    try {
      if (charges.length === 0) setLoading(true);
      const data = await fetchCharges(realestateId);
      const chargesArray = data.data || [];
      setCharges(chargesArray);
      if (!realestateId) {
        localStorage.setItem('host_charges_cache', JSON.stringify(chargesArray));
      }
    } catch (err) {
      setError('Erreur lors du chargement des charges');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCharge = async (id: number) => {
    try {
      await validateChargePayment(id);
      loadCharges();
    } catch (err) {
      setError('Erreur lors de la validation de la charge');
    }
  };

  useEffect(() => {
    loadCharges();
  }, [realestateId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700 border border-red-100">
        <AlertCircle className="h-5 w-5" />
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={loadCharges} className="ml-auto">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Receipt className="h-6 w-6 text-blue-600" />
          Mes Charges
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold px-6 shadow-md" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Charge
        </Button>
      </div>

      <AddChargeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          loadCharges();
        }}
      />

      {charges.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Receipt className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucune charge trouvée</p>
            <p className="text-sm">Commencez par ajouter une nouvelle charge pour vos propriétés.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {charges.map((charge, index) => (
              <motion.div
                key={charge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
                  <CardHeader className="bg-gray-50/50 pb-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                        <Receipt className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge variant={charge.status === 'paid' ? 'success' : charge.status === 'pending' ? 'warning' : 'destructive'} className="capitalize">
                        {charge.status === 'paid' ? 'Payée' : charge.status === 'pending' ? 'En attente' : 'Annulée'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-lg font-bold truncate">{charge.name}</CardTitle>
                    <p className="text-sm text-gray-500 line-clamp-1">{charge.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(charge.createdAt), 'dd MMMM yyyy', { locale: fr })}
                    </div>
                    
                    {charge.realestate && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                        <Home className="h-4 w-4" />
                        <span className="truncate">{charge.realestate.title}</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Montant</p>
                        <p className="text-2xl font-black text-gray-900">{charge.amount} <span className="text-sm font-normal text-gray-500">MAD</span></p>
                      </div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                        {charge.type === 'fixed' ? 'Fixe' : 'Variable'}
                      </Badge>
                    </div>

                    {charge.status === 'pending' && (
                      <Button onClick={() => handleValidateCharge(charge.id)} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-6">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Valider le Paiement
                      </Button>
                    )}
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
