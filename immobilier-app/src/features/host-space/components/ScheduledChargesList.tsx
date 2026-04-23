import React, { useState, useEffect } from 'react';
import { fetchScheduledCharges, ScheduledCharge } from '../api/chargesApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarClock, Home, Clock, Plus, Settings, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddScheduledChargeModal } from './AddScheduledChargeModal';

interface ScheduledChargesListProps {
  realestateId?: number;
}

export const ScheduledChargesList: React.FC<ScheduledChargesListProps> = ({ realestateId }) => {
  const [charges, setCharges] = useState<ScheduledCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCharges = async () => {
    try {
      setLoading(true);
      const data = await fetchScheduledCharges(realestateId);
      setCharges(data.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des charges programmées');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharges();
  }, [realestateId]);

  const getRecurrenceLabel = (type: string, value: string) => {
    switch (type) {
      case 'weekly': return `Chaque ${value}`;
      case 'monthly': return `Chaque ${value} du mois`;
      case 'yearly': return `Chaque ${value}`;
      default: return type;
    }
  };

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
          <CalendarClock className="h-6 w-6 text-purple-600" />
          Charges Programmées
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Programmer une Charge
        </Button>
      </div>

      <AddScheduledChargeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          loadCharges();
        }}
      />

      {charges.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
            <CalendarClock className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucune charge programmée</p>
            <p className="text-sm">Automatisez le suivi de vos charges récurrentes.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {charges.map((charge, index) => (
              <motion.div
                key={charge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:border-purple-200 transition-all border-gray-200">
                  <CardHeader className="bg-purple-50/30 pb-4 border-b border-purple-50">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white rounded-lg shadow-sm border border-purple-100">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <Badge className="bg-white text-purple-700 border-purple-200 uppercase text-[10px] tracking-widest font-black">
                        {charge.recurrenceType}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-lg font-bold text-gray-900">{charge.name}</CardTitle>
                    {charge.realestate && (
                      <div className="flex items-center gap-1.5 text-xs text-purple-700 font-bold bg-purple-50/50 w-fit px-2 py-0.5 rounded">
                        <Home className="h-3 w-3" />
                        {charge.realestate.title}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Récurrence</span>
                           <span className="text-sm font-bold text-gray-700">{getRecurrenceLabel(charge.recurrenceType, charge.recurrenceValue)}</span>
                         </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Montant Estimé</span>
                        <span className="text-xl font-black text-gray-900">{charge.amount} <span className="text-xs font-normal text-gray-500">MAD</span></span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                       <Button variant="outline" className="flex-1 text-xs h-9 border-gray-200 hover:bg-gray-50">
                         <Settings className="h-3.5 w-3.5 mr-2" />
                         Modifier
                       </Button>
                       <Button variant="outline" className="text-xs h-9 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 px-3">
                         <AlertCircle className="h-3.5 w-3.5" />
                       </Button>
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
