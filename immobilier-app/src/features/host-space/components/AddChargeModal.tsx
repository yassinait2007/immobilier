import React from 'react';
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
import { addCharge } from '../api/chargesApi';
import { useToast } from '@/utils/toast';

const chargeSchema = z.object({
  name: z.string().min(3, 'Le nom doit faire au moins 3 caractères'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('Le montant doit être positif'),
  type: z.enum(['fixed', 'variable']),
  realestate_id: z.coerce.number().positive('Veuillez choisir un bien'),
});

type ChargeFormValues = z.infer<typeof chargeSchema>;

interface AddChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddChargeModal: React.FC<AddChargeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { properties } = useProperties();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset } = useForm<ChargeFormValues>({
    resolver: zodResolver(chargeSchema),
    defaultValues: {
      type: 'fixed',
    }
  });

  const onSubmit = async (data: ChargeFormValues) => {
    try {
      await addCharge(data);
      toast({ title: 'Succès', description: 'La charge a été ajoutée.' });
      onSuccess();
      reset();
      onClose();
    } catch (err) {
      toast({ title: 'Erreur', description: 'Une erreur est survenue.', variant: 'destructive' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Nouvelle Charge</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="realestate_id" className="font-bold">Bien immobilier</Label>
            <Select onValueChange={(val) => setValue('realestate_id', parseInt(val))}>
              <SelectTrigger className="rounded-xl h-12 bg-gray-50 border-gray-100">
                <SelectValue placeholder="Sélectionner un bien" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((prop) => (
                  <SelectItem key={prop.id} value={prop.id.toString()}>
                    {prop.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.realestate_id && <p className="text-red-500 text-xs font-medium">{errors.realestate_id.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="font-bold">Type de charge</Label>
              <Select defaultValue="fixed" onValueChange={(val: any) => setValue('type', val)}>
                <SelectTrigger className="rounded-xl h-12 bg-gray-50 border-gray-100">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixe</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-bold">Montant (MAD)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount')}
                className="rounded-xl h-12 bg-gray-50 border-gray-100"
              />
              {errors.amount && <p className="text-red-500 text-xs font-medium">{errors.amount.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold">Nom de la charge</Label>
            <Input
              id="name"
              placeholder="ex: Facture Électricité..."
              {...register('name')}
              className="rounded-xl h-12 bg-gray-50 border-gray-100"
            />
            {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-bold">Description (Optionnel)</Label>
            <Textarea
              id="description"
              placeholder="Détails supplémentaires..."
              {...register('description')}
              className="rounded-xl min-h-[100px] bg-gray-50 border-gray-100"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold">
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-600 hover:bg-blue-700 px-8 font-black">
              {isSubmitting ? 'Ajout...' : 'Ajouter la Charge'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
