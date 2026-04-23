import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useProperties } from '@/context/PropertyContext';
import { addScheduledCharge } from '../api/chargesApi';
import { useToast } from '@/utils/toast';

const scheduledChargeSchema = z.object({
  name: z.string().min(3, 'Nom requis'),
  amount: z.coerce.number().positive(),
  type: z.enum(['fixed', 'variable']),
  recurrenceType: z.enum(['weekly', 'monthly', 'yearly']),
  recurrenceValue: z.string(),
  realestate_id: z.coerce.number().positive('Bien requis'),
});

type ScheduledFormValues = z.infer<typeof scheduledChargeSchema>;

interface AddScheduledChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddScheduledChargeModal: React.FC<AddScheduledChargeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { properties } = useProperties();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, watch } = useForm<ScheduledFormValues>({
    resolver: zodResolver(scheduledChargeSchema),
    defaultValues: {
      type: 'fixed',
      recurrenceType: 'monthly',
      recurrenceValue: '1',
    }
  });

  const recurrenceType = watch('recurrenceType');

  const onSubmit = async (data: ScheduledFormValues) => {
    try {
      await addScheduledCharge(data);
      toast({ title: 'Programmé !', description: 'La charge récurrente a été créée.' });
      onSuccess();
      reset();
      onClose();
    } catch (err) {
      toast({ title: 'Erreur', description: 'Impossible de programmer la charge.', variant: 'destructive' });
    }
  };

  const getRecurrenceValueLabel = () => {
    switch (recurrenceType) {
      case 'weekly': return 'Jour de la semaine';
      case 'monthly': return 'Jour du mois (1-31)';
      case 'yearly': return 'Date (ex: 01-01)';
      default: return 'Valeur';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-purple-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-purple-700">Programmer une Charge</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label className="font-bold">Propriété concernée</Label>
            <Select onValueChange={(val) => setValue('realestate_id', parseInt(val))}>
              <SelectTrigger className="rounded-xl h-12 bg-purple-50/20 border-purple-100">
                <SelectValue placeholder="Choisir un bien" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((prop) => (
                  <SelectItem key={prop.id} value={prop.id.toString()}>
                    {prop.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Nom du programme</Label>
            <Input {...register('name')} placeholder="ex: Maintenance mensuelle..." className="rounded-xl h-12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold">Fréquence</Label>
              <Select defaultValue="monthly" onValueChange={(val: any) => setValue('recurrenceType', val)}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="Périocidité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">{getRecurrenceValueLabel()}</Label>
              {recurrenceType === 'weekly' ? (
                <Select defaultValue="Lundi" onValueChange={(val) => setValue('recurrenceValue', val)}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input {...register('recurrenceValue')} placeholder={recurrenceType === 'monthly' ? '1' : '01-01'} className="rounded-xl h-12" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold">Type Prévu</Label>
              <Select defaultValue="fixed" onValueChange={(val: any) => setValue('type', val)}>
                <SelectTrigger className="rounded-xl h-12">
                   <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Montant Fixe</SelectItem>
                  <SelectItem value="variable">Montant Variable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Estimation (MAD)</Label>
              <Input type="number" {...register('amount')} className="rounded-xl h-12" />
            </div>
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold">Annuler</Button>
            <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-purple-600 hover:bg-purple-700 font-bold px-8 shadow-md">
              {isSubmitting ? 'Enregistrement...' : 'Activer le Programme'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
