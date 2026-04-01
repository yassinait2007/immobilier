import { useNavigate } from "react-router-dom";
import { Calendar, Users, MapPin, Home } from "lucide-react";
import { Booking } from "@/types/clientBooking";
import { formatCurrency } from "@/utils/formaters";
import { calculateNights } from "@/utils/calculators";
import BookingActions from "./BookingActions";
import BookingRating from "./BookingRating";

interface BookingCardProps {
  booking: Booking;
  onRateBooking: (booking: Booking) => void;
  onPayBooking: (booking: Booking) => void;
}

const BookingCard = ({ booking, onRateBooking, onPayBooking }: BookingCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "confirmé":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
      case "en_attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
      case "rejeté":
        return "bg-red-100 text-red-800 border-red-200";
      case "paid":
      case "payé":
      case "payed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
      case "terminé":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
      case "annulé":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handlePropertyClick = () => {
    navigate(`/property/${booking.realestate.id}`);
  };

  const getFullAddress = () => {
    if (booking.realestate.address?.city?.name) {
      return `${booking.realestate.address.address || ''}, ${booking.realestate.address.city.name}`;
    }
    return "Adresse non disponible";
  };

  const nights = calculateNights(booking.checkin, booking.checkout);

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(booking.status.status)}`}>
              {booking.status.status}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm font-medium">
              #{booking.id}
            </span>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {formatCurrency(booking.amount)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {nights} {nights > 1 ? 'nuits' : 'nuit'}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {booking.realestate.media?.[0] && (
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img 
                src={booking.realestate.media[0].url} 
                alt={booking.realestate.title}
                className="w-full h-48 sm:w-20 sm:h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={handlePropertyClick}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-gray-900 mb-2 text-base sm:text-lg cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
              onClick={handlePropertyClick}
            >
              {booking.realestate.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 mb-2">
              <MapPin size={12} className="sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{getFullAddress()}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Home size={12} className="sm:w-4 sm:h-4" />
                {booking.realestate.nbRooms || 0} pièces
              </span>
              <span>{booking.realestate.surface || 0}m²</span>
              {booking.realestate.category && (
                <span className="capitalize hidden sm:inline">{booking.realestate.category.name}</span>
              )}
              <span className="flex items-center gap-1">
                <Users size={12} className="sm:w-4 sm:h-4" />
                {booking.nbGuest} {booking.nbGuest > 1 ? 'invités' : 'invité'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-6 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-xs sm:text-sm text-gray-500 mb-1">Arrivée</div>
              <div className="font-semibold text-gray-900 flex items-center justify-center gap-1 text-sm sm:text-base">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{formatDateShort(booking.checkin)}</span>
                <span className="sm:hidden">{new Date(booking.checkin).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
              </div>
            </div>
            <div className="px-2 sm:px-4">
              <div className="w-6 sm:w-8 h-px bg-gray-300 relative">
                <div className="absolute right-0 top-0 transform -translate-y-1/2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-xs sm:text-sm text-gray-500 mb-1">Départ</div>
              <div className="font-semibold text-gray-900 flex items-center justify-center gap-1 text-sm sm:text-base">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{formatDateShort(booking.checkout)}</span>
                <span className="sm:hidden">{new Date(booking.checkout).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingRating booking={booking} />

      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <BookingActions
          booking={booking}
          onRateBooking={() => onRateBooking(booking)}
          onPayBooking={() => onPayBooking(booking)}
        />
      </div>
    </div>
  );
};

export default BookingCard;