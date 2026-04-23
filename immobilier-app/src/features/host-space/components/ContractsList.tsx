import React, { useState, useEffect } from 'react';
import { fetchContracts } from '../api/contractsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, FileSignature, User, Home, Calendar, Download, Plus, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/utils/toast';
import { AddContractModal } from './AddContractModal';

interface ContractsListProps {
  realestateId?: number;
}

export const ContractsList: React.FC<ContractsListProps> = ({ realestateId }) => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const loadContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchContracts(realestateId);
      let contractsArray = [];
      if (Array.isArray(data)) {
        contractsArray = data;
      } else if (data && Array.isArray((data as any).data)) {
        contractsArray = (data as any).data;
      }
      setContracts(contractsArray);
    } catch (err) {
      setError('Erreur lors du chargement des contrats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
  }, [realestateId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700 border border-red-100">
        <AlertCircle className="h-5 w-5" />
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={loadContracts} className="ml-auto">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileSignature className="h-6 w-6 text-purple-600" />
          Mes Contrats
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 font-bold px-6 shadow-md rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Contrat
        </Button>
      </div>

      <AddContractModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadContracts} 
      />

      {contracts.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
            <FileSignature className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucun contrat trouvé</p>
            <p className="text-sm">Gérez numériquement vos contrats de location et prestations.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {contracts.map((contract, index) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all border-gray-200 group">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-white pb-6 border-b border-purple-50">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-white rounded-2xl shadow-sm border border-purple-100 group-hover:scale-110 transition-transform">
                        <FileSignature className="h-6 w-6 text-purple-600" />
                      </div>
                      <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 capitalize font-bold">
                        {contract.type === 'client' ? 'Client' : 'Propriétaire'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-6 text-xl font-black text-gray-900">Contrat #{contract.id}</CardTitle>
                    {contract.realestate && (
                      <div className="flex items-center gap-2 text-sm text-purple-600 font-bold mt-2">
                        <Home className="h-4 w-4" />
                        <span className="truncate">{contract.realestate.title}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {contract.type === 'client' ? contract.client?.fullName : contract.owner?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Signé le: <b className="text-gray-900">{contract.signedDate ? format(new Date(contract.signedDate), 'dd/MM/yyyy') : '-'}</b></span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Expire le: <b className="text-gray-900">{contract.expirationDate ? format(new Date(contract.expirationDate), 'dd/MM/yyyy') : '-'}</b></span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                       {contract.documents && contract.documents.length > 0 ? (
                         contract.documents.map((doc: any, i: number) => (
                           <Button key={doc.id} variant="secondary" size="sm" className="flex-1 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100" asChild>
                             <a href={doc.url} target="_blank" rel="noopener noreferrer">
                               <Download className="h-4 w-4 mr-2" />
                               Doc {i + 1}
                             </a>
                           </Button>
                         ))
                       ) : (
                         <p className="text-xs text-gray-400 italic">Aucun document joint</p>
                       )}
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
