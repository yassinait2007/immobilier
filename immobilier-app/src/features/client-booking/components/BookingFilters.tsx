import { Filter } from "lucide-react";
import type { BookingStatus } from "@/types/clientBooking";

interface BookingFiltersProps {
  bookingStatuses: BookingStatus[];
  selectedStatus?: BookingStatus;
  onStatusFilter: (status?: BookingStatus) => void;
}

const BookingFilters = ({ bookingStatuses, selectedStatus, onStatusFilter }: BookingFiltersProps) => {
  return (
    <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filtrer par statut</h2>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => onStatusFilter(undefined)}
          className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
            !selectedStatus
              ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
          }`}
        >
          <span className="hidden sm:inline">Toutes les réservations</span>
          <span className="sm:hidden">Toutes</span>
        </button>
        {bookingStatuses.map((status) => (
          <button
            key={status.code}
            onClick={() => onStatusFilter(status)}
            className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              selectedStatus?.code === status.code
                ? "bg-gradient-to-r from-primary-light to-primary text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {status.status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingFilters;