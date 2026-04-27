import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Home, 
  CalendarCheck, 
  Receipt, 
  FileSignature, 
  Settings, 
  Bell, 
  CircleUser, 
  Search, 
  Plus,
  ShieldAlert,
  Menu,
  BarChart3
} from 'lucide-react';
import { ChargesList } from './components/ChargesList';
import { ScheduledChargesList } from './components/ScheduledChargesList';
import { ContractsList } from './components/ContractsList';
import { BookingsList } from './components/BookingsList';
import { PropertiesList } from './components/PropertiesList';
import { PropertyApprovalList } from './components/PropertyApprovalList';
import { NotificationsDropdown } from './components/NotificationsDropdown';
import { SettingsModal } from './components/SettingsModal';
import { DashboardStats } from './components/DashboardStats';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/utils/toast';
import { useAuth } from '@/context/authentication/auth-context';
import { useProperties } from '@/context/PropertyContext';
import { fetchPendingAnounces } from './api/anouncesApi';

export const HostSpacePage = () => {
  const { info } = useToast();
  const { user } = useAuth();
  const { properties } = useProperties();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [adminPendingCount, setAdminPendingCount] = useState(0);
  
  const isAdmin = user?.type === 'admin' || user?.type === 'manager'; // Actual admin types

  useEffect(() => {
    if (isAdmin) {
      fetchPendingAnounces().then(res => {
        setAdminPendingCount(res.data?.length || 0);
      }).catch(console.error);
    }
  }, [isAdmin]);

  const hostPendingPropertiesCount = properties.filter(p => 
    p.status?.value === 'pending' || p.status?.name === 'En attente' || p.status?.name === 'Privé'
  ).length;

  const pendingPropertiesCount = isAdmin ? adminPendingCount : hostPendingPropertiesCount;
  
  const handleNotImplemented = (featureName: string) => {
     info(
       'En cours de développement 🚧',
       `La fonctionnalité "${featureName}" n'est pas encore disponible.`
     );
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pb-10">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {/* Top Navigation - Compact & Mobile Friendly */}
      <nav className="bg-white/80 border-b border-gray-100 py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-4 md:gap-12 flex-1">
           <h1 className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">Immobilier<span className="text-gray-900">App</span></h1>
           <div className="relative max-w-sm w-full hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 font-bold" />
              <Input placeholder="Recherche rapide..." className="bg-gray-100 border-0 h-11 pl-11 rounded-2xl w-full text-sm font-medium" />
           </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
           <NotificationsDropdown />
           <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-gray-100 cursor-pointer group">
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black text-gray-900 leading-none">{user?.firstName || 'Host'} {user?.lastName || ''}</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                   {user?.type === 'admin' ? 'Administrateur' : 'Propriétaire'}
                 </p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                 <CircleUser className="h-6 w-6" />
              </div>
              <Menu className="h-5 w-5 text-gray-400 md:hidden" />
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-8 lg:py-12">
        <Tabs defaultValue="properties" className="space-y-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-6 lg:mb-10">
             <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <div className="h-1.5 w-10 bg-blue-600 rounded-full" />
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{isAdmin ? 'Supervision' : 'Tableau de bord'}</p>
                </div>
                <div className="flex items-center gap-4">
                   <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                     {isAdmin ? 'Gestion Globale' : 'Mon Espace'}
                   </h2>
                   <div className="h-12 w-12 hidden sm:flex rounded-2xl bg-amber-100 border border-amber-200 items-center justify-center text-amber-600">
                      <LayoutDashboard className="h-6 w-6" />
                   </div>
                </div>
             </div>

              <div className="flex items-center gap-3">
                 <Button asChild className="h-14 px-8 rounded-3xl bg-blue-600 hover:bg-blue-700 font-black shadow-xl shadow-blue-500/20 text-md gap-3 hover:scale-105 transition-transform group">
                    <Link to="/host/add-property">
                       <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                       Nouveau Bien
                    </Link>
                 </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-3xl bg-white border-gray-100 shadow-sm hover:bg-gray-50" onClick={() => setIsSettingsOpen(true)}>
                   <Settings className="h-6 w-6 text-gray-400" />
                </Button>
             </div>
          </div>

          {/* Mobile Scrollable Tab Selection */}
          <div className="sticky top-[84px] z-40 overflow-x-auto no-scrollbar -mx-4 px-4 py-2">
            <div className="bg-white/70 backdrop-blur-xl p-1.5 rounded-[2rem] border border-white shadow-xl shadow-gray-200/40 w-max mx-auto md:mx-0">
               <TabsList className="bg-transparent h-14 md:h-16 gap-1 md:gap-2 px-1">
                 <TabsTrigger value="properties" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                   <Home className="h-4 w-4 md:h-5 md:w-5" />
                   Biens
                 </TabsTrigger>
                 
                 {isAdmin && (
                   <TabsTrigger value="validation" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500 relative">
                     <ShieldAlert className="h-4 w-4 md:h-5 md:w-5" />
                     Validation
                     {pendingPropertiesCount > 0 && (
                       <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">{pendingPropertiesCount}</span>
                     )}
                   </TabsTrigger>
                 )}

                 <TabsTrigger value="bookings" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                   <CalendarCheck className="h-4 w-4 md:h-5 md:w-5" />
                   Résas
                 </TabsTrigger>
                 
                 <TabsTrigger value="charges" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                   <Receipt className="h-4 w-4 md:h-5 md:w-5" />
                   Finances
                 </TabsTrigger>
                 
                 <TabsTrigger value="contracts" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                   <FileSignature className="h-4 w-4 md:h-5 md:w-5" />
                   Contrats
                 </TabsTrigger>

                 <TabsTrigger value="stats" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-xl md:rounded-2xl h-11 md:h-12 px-5 md:px-8 gap-2.5 font-black text-xs md:text-sm tracking-tight transition-all duration-500">
                   <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
                   Stats
                 </TabsTrigger>
               </TabsList>
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-8 transition-all duration-500">
            <TabsContent value="properties" className="mt-0 focus:outline-none">
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <PropertiesList />
              </section>
            </TabsContent>

            {isAdmin && (
              <TabsContent value="validation" className="mt-0 focus:outline-none">
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <PropertyApprovalList />
                </section>
              </TabsContent>
            )}

            <TabsContent value="bookings" className="mt-0 focus:outline-none">
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <BookingsList />
              </section>
            </TabsContent>

            <TabsContent value="charges" className="mt-0 focus:outline-none space-y-16">
              <section className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-gray-200/40 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <ChargesList />
              </section>
              
              <section className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-gray-200/40 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                 <ScheduledChargesList />
              </section>
            </TabsContent>

            <TabsContent value="contracts" className="mt-0 focus:outline-none">
              <section className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-gray-200/40 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <ContractsList />
              </section>
            </TabsContent>

            <TabsContent value="stats" className="focus-visible:outline-none focus-visible:ring-0">
               <DashboardStats />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export { AddPropertyPage } from './AddPropertyPage';
export { EditPropertyPage } from './EditPropertyPage';
