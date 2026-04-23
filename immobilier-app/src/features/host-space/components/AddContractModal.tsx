import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useProperties } from '@/context/PropertyContext';
import { addContract } from '../api/contractsApi';
import { useToast } from '@/utils/toast';
import { Upload, FileText, Calendar, Wallet } from 'lucide-react';

const contractSchema = z.object({
  realestate_id: z.coerce.number().positive('Veuillez choisir un bien'),
  type: z.enum(['client', 'owner']),
  signedDate: z.string().min(1, 'La date de signature est requise'),
  expirationDate: z.string().min(1, 'La date d\'expiration est requise'),
  price: z.coerce.number().positive('Le montant doit être positif'),
  note: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractSchema>;

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddContractModal: React.FC<AddContractModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { properties } = useProperties();
  const { success, error } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      type: 'client',
    }
  });

  const onSubmit = async (data: ContractFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      if (file) {
        formData.append('document', file);
      }

      await addContract(formData);
      success('Succès', 'Le contrat a été généré avec succès.');
      onSuccess();
      reset();
      setFile(null);
      onClose();
    } catch (err) {
      error('Erreur', 'Impossible de créer le contrat.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden border-0 shadow-2xl">
        <div className="bg-purple-600 p-8 text-white">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-2">
               <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
               </div>
               <DialogTitle className="text-2xl font-black tracking-tight">Nouveau Contrat</DialogTitle>
            </div>
            <p className="text-purple-100 font-medium">Générez un contrat de location officiel en quelques secondes.</p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Bien immobilier</Label>
              <Select onValueChange={(val) => setValue('realestate_id', parseInt(val))}>
                <SelectTrigger className="rounded-2xl h-14 bg-gray-50 border-gray-100 font-bold focus:ring-purple-500">
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((prop) => (
                    <SelectItem key={prop.id} value={prop.id.toString()}>
                      {prop.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.realestate_id && <p className="text-red-500 text-[10px] font-bold">{errors.realestate_id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Montant (MAD)</Label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                <Input
                  type="number"
                  placeholder="0.00"
                  {...register('price')}
                  className="rounded-2xl h-14 pl-12 bg-gray-50 border-gray-100 font-black text-lg focus:ring-purple-500"
                />
              </div>
              {errors.price && <p className="text-red-500 text-[10px] font-bold">{errors.price.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date de début</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                <Input
                  type="date"
                  {...register('signedDate')}
                  className="rounded-2xl h-14 pl-12 bg-gray-50 border-gray-100 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date de fin</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                <Input
                  type="date"
                  {...register('expirationDate')}
                  className="rounded-2xl h-14 pl-12 bg-gray-50 border-gray-100 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Document (PDF/Scan)</Label>
            <div 
              className="border-2 border-dashed border-gray-100 rounded-2xl p-6 text-center hover:bg-purple-50 transition-colors cursor-pointer group"
              onClick={() => document.getElementById('contract-doc')?.click()}
            >
              <input 
                id="contract-doc" 
                type="file" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Upload className="h-6 w-6 text-purple-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-gray-400">
                {file ? file.name : "Cliquez pour joindre le contrat signé"}
              </p>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-50 flex gap-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-14 px-8 font-black text-gray-400">
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="rounded-2xl h-14 px-10 bg-purple-600 hover:bg-purple-700 font-black shadow-xl shadow-purple-500/20 flex-1 transition-all active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Génération...
                </>
              ) : 'Valider le Contrat'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
