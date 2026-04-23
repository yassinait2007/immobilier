import React, { useState, useEffect } from 'react';
import { fetchHostBookings } from '../api/bookingsApi';
import { Booking } from '@/types/clientBooking';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CalendarCheck, User, Users, Home, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingsListProps {
  realestateId?: number;
}

export const BookingsList: React.FC<BookingsListProps> = ({ realestateId }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (!realestateId) {
      const saved = localStorage.getItem('host_bookings_cache');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  const [loading, setLoading] = useState(bookings.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      if (bookings.length === 0) setLoading(true);
      const data = await fetchHostBookings(realestateId);
      let bookingsArray = [];
      if (Array.isArray(data)) {
        bookingsArray = data;
      } else if (data && Array.isArray((data as any).data)) {
        bookingsArray = (data as any).data;
      }
      setBookings(bookingsArray);
      if (!realestateId) {
        localStorage.setItem('host_bookings_cache', JSON.stringify(bookingsArray));
      }
    } catch (err) {
      setError('Erreur lors du chargement des réservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [realestateId]);

  const getStatusColor = (status?: string): "success" | "warning" | "destructive" | "secondary" | "default" => {
    switch (status?.toLowerCase()) {
      case 'payed':
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'canceled': return 'destructive';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700 border border-red-100">
        <AlertCircle className="h-5 w-5" />
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={loadBookings} className="ml-auto">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-teal-600" />
          Réservations
        </h2>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-white text-teal-700 border-teal-100 font-bold px-4 py-1.5 rounded-full">
             {bookings.length} Total
           </Badge>
        </div>
      </div>

      {bookings.length === 0 ? (
        <Card className="border-dashed border-2 shadow-none border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="p-6 bg-gray-50 rounded-full mb-4">
              <CalendarCheck className="h-12 w-12 opacity-30" />
            </div>
            <p className="text-xl font-black text-gray-900">Aucune réservation</p>
            <p className="max-w-xs text-center text-gray-400 mt-2">Dès qu'un client réserve un de vos biens, il apparaîtra ici.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="hover:shadow-xl transition-all border-teal-50 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500 rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.3)]" />
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-stretch">
                      <div className="bg-teal-50/20 p-6 flex flex-col justify-center min-w-[200px] border-r border-teal-50/50">
                        <Badge variant={getStatusColor(booking.status?.value)} className="w-fit mb-4 uppercase tracking-widest text-[10px] font-black px-3 py-1">
                          {booking.status?.name || 'Inconnu'}
                        </Badge>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Client</p>
                          <div className="flex items-center gap-2">
                             <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-teal-100">
                               <User className="h-4 w-4 text-teal-600" />
                             </div>
                             <p className="text-base font-black text-gray-900 truncate">
                               {booking.client?.fullName || 'Client Anonyme'}
                             </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                           <div className="space-y-1">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Séjour</p>
                              <div className="flex items-center gap-2 font-bold text-gray-900">
                                <span>{format(new Date(booking.checkin!), 'dd MMM', { locale: fr })}</span>
                                <ArrowRight className="h-3 w-3 text-teal-400" />
                                <span>{format(new Date(booking.checkout!), 'dd MMM', { locale: fr })}</span>
                              </div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bien</p>
                              <div className="flex items-center gap-2 font-black text-blue-600 truncate">
                                <Home className="h-3.5 w-3.5" />
                                <span className="line-clamp-1">{booking.realestate?.title}</span>
                              </div>
                           </div>
                           <div className="space-y-1">
                              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Voyageurs</p>
                              <div className="flex items-center gap-2 font-bold text-gray-900">
                                <Users className="h-3.5 w-3.5 text-gray-400" />
                                <span>{booking.nbGuest} Personne{(booking.nbGuest ?? 0) > 1 ? 's' : ''}</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-10">
                           <div className="text-right">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Recette</p>
                              <p className="text-2xl font-black text-teal-700 tracking-tighter flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-teal-500" />
                                {booking.amount} <span className="text-xs font-normal text-gray-400 ml-1">MAD</span>
                              </p>
                           </div>
                           <Button variant="ghost" size="icon" className="rounded-full bg-teal-50/50 hover:bg-teal-100/50 text-teal-700 hidden group-hover:flex">
                              <ArrowRight className="h-5 w-5" />
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
