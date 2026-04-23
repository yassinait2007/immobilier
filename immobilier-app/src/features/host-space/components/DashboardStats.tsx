import React, { useState, useEffect } from 'react';
import { fetchGlobalStats, GlobalStats } from '../api/statsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Receipt, 
  Loader2, 
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

export const DashboardStats = () => {
  const [stats, setStats] = useState<GlobalStats | null>(() => {
    const saved = localStorage.getItem('dashboard_stats_cache');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(!stats);
  const [timeRange, setTimeRange] = useState('7d');
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      if (!stats) setLoading(true);
      setError(null);
      const to = format(new Date(), 'yyyy-MM-dd');
      const from = format(subDays(new Date(), timeRange === '7d' ? 7 : 30), 'yyyy-MM-dd');
      const data = await fetchGlobalStats(from, to, 'day');
      setStats(data.data);
      localStorage.setItem('dashboard_stats_cache', JSON.stringify(data.data));
    } catch (err) {
      console.error('Failed to load stats', err);
      setError('Impossible de charger les statistiques.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [timeRange]);

  if (error && !stats) {
    return (
      <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 text-center space-y-4">
        <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
           <AlertCircle className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Erreur de chargement</h3>
          <p className="text-gray-500">{error}</p>
        </div>
        <Button onClick={loadStats} variant="outline" className="rounded-xl">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const netProfit = (stats.totalPlatform || 0) + (stats.totalRealworld || 0) - (stats.totalCharges || 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Analyse de Performance
          </h2>
          <p className="text-sm text-gray-400 font-medium tracking-tight">Vue d'ensemble de votre activité immobilière.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm self-start">
           <button 
             onClick={() => setTimeRange('7d')}
             className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${timeRange === '7d' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-gray-600'}`}
           >
             7 DERNIERS JOURS
           </button>
           <button 
             onClick={() => setTimeRange('30d')}
             className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${timeRange === '30d' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-gray-600'}`}
           >
             30 DERNIERS JOURS
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Platform Revenue */}
         <Card className="border-0 shadow-xl shadow-gray-200/40 rounded-[2.5rem] overflow-hidden group">
            <CardContent className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                     <TrendingUp className="h-6 w-6" />
                  </div>
                  <Badge className="bg-green-100 text-green-600 border-green-200 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                     <ArrowUpRight className="h-3 w-3 mr-1" />
                     +12%
                  </Badge>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Revenu Plateforme</p>
               <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                  {(stats.totalPlatform || 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">MAD</span>
               </h3>
            </CardContent>
         </Card>

         {/* Realworld Revenue */}
         <Card className="border-0 shadow-xl shadow-gray-200/40 rounded-[2.5rem] overflow-hidden group">
            <CardContent className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                     <TrendingUp className="h-6 w-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Revenu Direct (Réel)</p>
               <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                  {(stats.totalRealworld || 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">MAD</span>
               </h3>
            </CardContent>
         </Card>

         {/* Charges */}
         <Card className="border-0 shadow-xl shadow-gray-200/40 rounded-[2.5rem] overflow-hidden group">
            <CardContent className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                     <Receipt className="h-6 w-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Charges</p>
               <h3 className="text-3xl font-black text-gray-900 tracking-tighter text-red-600">
                  {(stats.totalCharges || 0).toLocaleString()} <span className="text-sm font-normal text-gray-400">MAD</span>
               </h3>
            </CardContent>
         </Card>

         {/* Net Profit */}
         <Card className="border-0 shadow-2xl shadow-blue-500/10 rounded-[2.5rem] bg-gray-900 overflow-hidden group ring-4 ring-blue-500/5">
            <CardContent className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                     <Wallet className="h-6 w-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Bénéfice Net</p>
               <h3 className="text-3xl font-black text-white tracking-tighter">
                  {(netProfit || 0).toLocaleString()} <span className="text-sm font-normal text-blue-300">MAD</span>
               </h3>
            </CardContent>
         </Card>
      </div>

      {/* Simple Visualization */}
      <Card className="border-0 shadow-xl shadow-gray-200/40 rounded-[3rem] bg-white p-8 lg:p-12">
        <CardHeader className="px-0 pt-0 mb-10">
          <CardTitle className="text-2xl font-black tracking-tight">Répartition Journalière</CardTitle>
          <p className="text-sm text-gray-400 font-medium">Visualisation des flux financiers sur la période.</p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="h-[300px] w-full flex items-end gap-2 px-4 border-b border-gray-100 min-h-[200px] relative">
             {(() => {
               // Combine platform and realworld data for the chart
               const combinedData: Record<string, number> = {};
               (stats.platform || []).forEach(d => {
                 combinedData[d.period] = (combinedData[d.period] || 0) + d.amount;
               });
               (stats.realworld || []).forEach(d => {
                 combinedData[d.period] = (combinedData[d.period] || 0) + d.amount;
               });

               const chartItems = Object.entries(combinedData)
                 .sort(([a], [b]) => a.localeCompare(b))
                 .map(([period, amount]) => ({ period, amount }));

               if (chartItems.length === 0) {
                 return (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
                     <BarChart3 className="h-10 w-10 opacity-20" />
                     <p className="text-sm font-bold">Aucune activité enregistrée sur cette période</p>
                   </div>
                 );
               }

               const max = Math.max(...chartItems.map(x => x.amount), 1);

               return chartItems.map((p, idx) => {
                 const height = (p.amount / max) * 100;
                 return (
                   <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      <div 
                        style={{ height: `${Math.max(height, 5)}%` }} 
                        className="w-full max-w-[20px] bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                      >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 transition-all">
                            {p.amount.toLocaleString()} MAD
                         </div>
                      </div>
                      {idx % (timeRange === '30d' ? 5 : 2) === 0 && (
                        <span className="absolute -bottom-8 text-[9px] font-black text-gray-400 uppercase tracking-tighter rotate-45 origin-left">
                          {format(new Date(p.period), 'dd MMM', { locale: fr })}
                        </span>
                      )}
                   </div>
                 );
               });
             })()}
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-8 justify-center">
             <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-500" />
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Revenu Total</span>
             </div>
             <div className="flex items-center gap-2 opacity-50">
                <div className="h-3 w-3 rounded bg-red-400" />
                <span className="text-xs font-black text-gray-500 uppercase tracking-widest transition-all">Dépenses (Charges)</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    {children}
  </div>
);
