import { useNavigate } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import type { BookingStatus } from "@/types/clientBooking";

interface EmptyBookingsProps {
  selectedStatus?: BookingStatus;
  bookingStatuses: BookingStatus[];
}

const EmptyBookings = ({ selectedStatus, bookingStatuses }: EmptyBookingsProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          {selectedStatus
            ? `Aucune réservation ${bookingStatuses.find((s) => s.code === selectedStatus.code)?.status?.toLowerCase()}`
            : "Aucune réservation trouvée"}
        </h3>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
          {selectedStatus
            ? `Vous n'avez pas de réservation avec le statut "${
                bookingStatuses.find((s) => s.code === selectedStatus.code)?.status || ""
              }".`
            : "Vous n'avez pas encore effectué de réservation. Découvrez nos propriétés exceptionnelles."}
        </p>
        <button
          onClick={() => navigate("/categories")}
          className="bg-gradient-to-r from-primary-light to-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Explorer les propriétés</span>
          <span className="sm:hidden">Explorer</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyBookings;