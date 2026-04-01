import { CreditCard, Star, CheckCircle, Clock } from "lucide-react";
import type { Booking } from "@/types/clientBooking";

interface BookingActionsProps {
  booking: Booking;
  onRateBooking: () => void;
  onPayBooking: () => void;
}

const BookingActions = ({ booking, onRateBooking, onPayBooking }: BookingActionsProps) => {
  const isPaid = booking.status.code === "payed";
  const canRate = booking.isRatable && !booking.myRate;
  const canPay = booking.status.code === "confirmed";

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      {canPay && (
        <button
          onClick={onPayBooking}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          <CreditCard size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Payer maintenant</span>
          <span className="sm:hidden">Payer</span>
        </button>
      )}

      {canRate && (
        <button
          onClick={onRateBooking}
          className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          <Star size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Évaluer la propriété</span>
          <span className="sm:hidden">Évaluer</span>
        </button>
      )}

      {booking.status.code === 'confirmed' && !canPay && (
        <div className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-green-50 rounded-lg text-green-700 text-sm sm:text-base">
          <CheckCircle size={14} className="sm:w-4 sm:h-4" />
          <span className="font-medium">
            <span className="hidden sm:inline">Réservation confirmée</span>
            <span className="sm:hidden">Confirmée</span>
          </span>
        </div>
      )}

      {booking.status.code === 'rejected' && (
        <div className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-red-50 rounded-lg text-red-700 text-sm sm:text-base">
          <CheckCircle size={14} className="sm:w-4 sm:h-4" />
          <span className="font-medium">
            <span className="hidden sm:inline">Réservation rejetée</span>
            <span className="sm:hidden">Rejetée</span>
          </span>
        </div>
      )}

      {isPaid && booking.myRate && (
        <div className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-blue-50 rounded-lg text-blue-700 text-sm sm:text-base">
          <Star size={14} className="sm:w-4 sm:h-4" />
          <span className="font-medium">
            <span className="hidden sm:inline">Propriété évaluée</span>
            <span className="sm:hidden">Évaluée</span>
          </span>
        </div>
      )}

      {isPaid && !booking.isRatable && !booking.myRate && (
        <div className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-blue-50 rounded-lg text-blue-700 text-sm sm:text-base">
          <Clock size={14} className="sm:w-4 sm:h-4" />
          <span className="font-medium">Payé</span>
        </div>
      )}
    </div>
  );
};

export default BookingActions;