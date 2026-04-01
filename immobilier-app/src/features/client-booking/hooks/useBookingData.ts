import { useState, useEffect, useCallback } from 'react';
import { getBookingByStatus, getBookingsStatus } from '../api/bookingApi';
import type { Booking, BookingStatus } from '@/types/clientBooking';
import { Pagination } from '@/types/apiResponsePagination';

export const useBookingData = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStatuses, setBookingStatuses] = useState<BookingStatus[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const loadStatuses = useCallback(async () => {
    setLoadingStatuses(true);
    try {
      const res = await getBookingsStatus();
      setBookingStatuses(res.data);
    } catch (error) {
      console.error("Error loading booking statuses:", error);
    } finally {
      setLoadingStatuses(false);
    }
  }, []);

  const loadBookings = useCallback(async (status?: BookingStatus, page = 1) => {
    setLoadingBookings(true);
    try {
      const res = await getBookingByStatus(status, page);
      setBookings(res.data.items);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  const handleStatusFilter = useCallback((status?: BookingStatus) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    loadBookings(status, 1);
  }, [loadBookings]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    loadBookings(selectedStatus, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedStatus, loadBookings]);

  const refreshBookings = useCallback(() => {
    loadBookings(selectedStatus, currentPage);
  }, [selectedStatus, currentPage, loadBookings]);

  useEffect(() => {
    const initializeData = async () => {
      await loadStatuses();
      await loadBookings();
    };
    initializeData();
  }, [loadStatuses, loadBookings]);

  return {
    bookings,
    bookingStatuses,
    pagination,
    loadingBookings,
    loadingStatuses,
    selectedStatus,
    currentPage,
    handleStatusFilter,
    handlePageChange,
    refreshBookings
  };
};