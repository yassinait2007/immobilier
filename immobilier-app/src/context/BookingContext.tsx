import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '@/types/clientBooking';
import apiClient from '@/api/apiClient';
import { useAuth } from './authentication/auth-context';

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const fetchBookings = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      // This endpoint should return bookings for the host
      const response = await apiClient.get('/host/bookings');
      setBookings(response.data.data || []);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError('Impossible de charger vos réservations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else {
      setBookings([]);
    }
  }, [isAuthenticated]);

  return (
    <BookingContext.Provider value={{ bookings, loading, error, refreshBookings: fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
