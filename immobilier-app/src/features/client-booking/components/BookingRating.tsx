import { Star, Sparkles, MessageCircle, Target, MapPin } from "lucide-react";
import type { Booking } from "@/types/clientBooking";

interface BookingRatingProps {
  booking: Booking;
}

const BookingRating = ({ booking }: BookingRatingProps) => {
  if (!booking.myRate) return null;

  const ratingCategories = [
    { key: 'cleanliness', label: 'Propreté', icon: Sparkles },
    { key: 'communication', label: 'Communication', icon: MessageCircle },
    { key: 'accuracy', label: 'Précision', icon: Target },
    { key: 'location', label: 'Emplacement', icon: MapPin }
  ] as const;

  return (
    <div className="mx-4 sm:mx-6 mb-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={14} className="sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-blue-900">Votre évaluation</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`sm:w-4 sm:h-4 ${
                  i < (booking.myRate?.rate || 0) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="text-xs sm:text-sm font-medium text-blue-900 ml-1">
              {(booking.myRate?.rate || 0)}/5
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-blue-800 mb-3 line-clamp-2">"{booking.myRate?.comment || ''}"</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {ratingCategories.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Icon size={10} className="sm:w-3 sm:h-3 text-blue-600" />
                <span className="text-blue-700">{label}:</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={8}
                    className={`sm:w-2.5 sm:h-2.5 ${
                      i < (booking.myRate?.[key] || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-medium ml-1 text-xs">{booking.myRate?.[key] || 0}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingRating;