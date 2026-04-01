import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Booking } from '@/types/clientBooking';

export const useBookingActions = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRateBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsRatingModalOpen(true);
  };

  const handlePayBooking = (booking: Booking) => {
    navigate(`/checkout/${booking.id}`);
  };

  const handleRatingSuccess = () => {
    setIsRatingModalOpen(false);
    setSelectedBooking(null);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
    setSelectedBooking(null);
  };

  return {
    selectedBooking,
    isRatingModalOpen,
    handleRateBooking,
    handlePayBooking,
    handleRatingSuccess,
    closeRatingModal
  };
};