import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/authentication/auth-context';
import { useToast } from '@/utils/toast';
import { Loader2, Save, User as UserIcon, Lock, Mail, Phone, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { success } = useToast();
  const [loading, setLoading] = useState(false);

  // Fallback state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    success("Profil mis à jour", "Vos informations personnelles ont été enregistrées avec succès.");
    onClose();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    success("Mot de passe modifié", "Votre nouveau mot de passe a été enregistré avec succès.");
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-700">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <DialogTitle className="text-2xl font-black text-gray-900">Paramètres</DialogTitle>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Gérez votre compte et vos préférences
            </p>
          </div>
        </div>

        <div className="p-8">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6 w-full flex bg-gray-100 p-1 rounded-xl h-12">
              <TabsTrigger value="profile" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-sm">
                 <UserIcon className="h-4 w-4 mr-2" />
                 Profil
              </TabsTrigger>
              <TabsTrigger value="security" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-sm">
                 <Lock className="h-4 w-4 mr-2" />
                 Sécurité
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="focus:outline-none">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Prénom</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-gray-700">Nom</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Adresse Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 600000000"
                      className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200" 
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button type="submit" disabled={loading} className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    Enregistrer
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="security" className="focus:outline-none">
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Mot de passe actuel</Label>
                  <Input 
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200" 
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Nouveau mot de passe</Label>
                  <Input 
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200" 
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-gray-700">Confirmer le nouveau mot de passe</Label>
                  <Input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200" 
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button 
                    type="submit" 
                    disabled={loading || !formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword} 
                    className="h-12 px-8 rounded-xl bg-gray-900 hover:bg-black font-bold"
                  >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Lock className="h-5 w-5 mr-2" />}
                    Mettre à jour la sécurité
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
