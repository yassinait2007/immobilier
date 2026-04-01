"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import { ContentLoading, PageLoading } from "@/components/ui/loading";
import MyPagination from "@/components/MyPagination";
import { useBookingData, useBookingActions } from "./hooks";
import {
  BookingHeader,
  BookingFilters,
  EmptyBookings,
  BookingCard,
  RatingModal
} from "./components";

const MyBookingsPage = () => {
  const {
    bookings,
    bookingStatuses,
    pagination,
    loadingBookings,
    loadingStatuses,
    selectedStatus,
    handleStatusFilter,
    handlePageChange,
    refreshBookings
  } = useBookingData();

  const {
    selectedBooking,
    isRatingModalOpen,
    handleRateBooking,
    handlePayBooking,
    handleRatingSuccess,
    closeRatingModal
  } = useBookingActions();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Mes Réservations - ${siteConfig.website.name}`;
  }, []);

  const onRatingSuccess = () => {
    handleRatingSuccess();
    refreshBookings();
  };

  if (loadingStatuses) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BookingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <BookingFilters
          bookingStatuses={bookingStatuses}
          selectedStatus={selectedStatus}
          onStatusFilter={handleStatusFilter}
        />

        <div className="min-h-[400px] relative">
          {loadingBookings ? (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <ContentLoading 
                message="Chargement des réservations..." 
                description="Filtrage selon vos critères"
              />
            </div>
          ) : bookings.length === 0 ? (
            <EmptyBookings
              selectedStatus={selectedStatus}
              bookingStatuses={bookingStatuses}
            />
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onRateBooking={handleRateBooking}
                  onPayBooking={handlePayBooking}
                />
              ))}
            </div>
          )}
        </div>

        {pagination && pagination.last_page > 1 && (
          <div className="mt-8 sm:mt-12">
            <MyPagination 
              currentPage={pagination.current_page}
              totalPages={pagination.last_page}
              onPageChange={handlePageChange} 
            />
          </div>
        )}
      </div>

      {selectedBooking && (
        <RatingModal
          booking={selectedBooking}
          isOpen={isRatingModalOpen}
          onClose={closeRatingModal}
          onRatingSuccess={onRatingSuccess}
        />
      )}
    </div>
  );
};

export default MyBookingsPage;