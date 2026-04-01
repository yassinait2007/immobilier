import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formaters";
import { MapPin, Star, Calendar, Home } from "lucide-react";
import type { Booking } from "@/types/clientBooking";

interface BookingDetailsProps {
  booking: Booking;
  calculateNights: () => number;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({ 
  booking, 
  calculateNights 
}) => {
  const navigate = useNavigate();
  const nights = calculateNights();
  const pricePerNight = booking.realestate?.price || 0;
  const subtotal = pricePerNight * nights;

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-light p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Résumé de la réservation
          </h3>
          <p className="text-primary-foreground/80 text-sm">
            Vérifiez les détails de votre séjour
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex gap-4">
              <div className="relative">
                <button
                  onClick={() => navigate(`/property/${booking.realestate?.id}`)}
                  className="block transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={booking.realestate?.media?.[0]?.url || "/placeholder.svg"}
                    alt={booking.realestate?.title || "Propriété"}
                    className="w-24 h-24 rounded-xl object-cover border border-gray-200 hover:border-primary transition-colors duration-200"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => navigate(`/property/${booking.realestate?.id}`)}
                  className="text-left hover:text-primary transition-colors duration-200 block w-full"
                >
                  <h4 className="font-semibold text-gray-900 text-base mb-2 leading-tight hover:underline">
                    {booking.realestate?.title}
                  </h4>
                </button>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span>
                      {booking.realestate?.nbRooms} chambres
                      {booking.realestate?.nbBathroom && ` • ${booking.realestate.nbBathroom} sdb`}
                    </span>
                  </div>
                  {booking.realestate?.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">
                        {booking.realestate.address.city?.name && booking.realestate.address.city.region?.name ? 
                          `${booking.realestate.address.city.name}, ${booking.realestate.address.city.region.name}` : 
                          booking.realestate.address.address
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {booking.realestate?.host && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate(`/host/profile/${booking.realestate?.host.id}`)}
                  className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 -m-2"
                >
                  <div className="relative">
                    <img
                      src={booking.realestate.host.profile || "/placeholder.svg"}
                      alt={`${booking.realestate.host.firstName} ${booking.realestate.host.lastName}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm hover:border-primary transition-colors duration-200"
                    />
                    {booking.realestate.host.isEmailVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 hover:text-primary transition-colors duration-200">
                      Hôte: {booking.realestate.host.firstName} {booking.realestate.host.lastName}
                    </p>
                    {booking.realestate.host.rate > 0 && booking.realestate.host.nbRates > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">
                          {booking.realestate.host.rate.toFixed(1)} • {booking.realestate.host.nbRates} avis
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Détails du séjour
            </h4>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Arrivée</span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(booking.checkin).toLocaleDateString("fr-FR", {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Départ</span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(booking.checkout).toLocaleDateString("fr-FR", {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Durée</span>
                <span className="text-sm font-semibold text-gray-900">
                  {nights} {nights === 1 ? "nuit" : "nuits"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">Invités</span>
                <span className="text-sm font-semibold text-gray-900">
                  {booking.nbGuest} {booking.nbGuest === 1 ? "personne" : "personnes"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Détail des prix</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-gray-700 font-medium text-sm">
                <span>
                  {formatCurrency(pricePerNight)} × {nights} {nights === 1 ? "nuit" : "nuits"}
                </span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="border-t border-gray-300 pt-4 font-bold flex justify-between text-primary text-xl">
                <span>Total (MAD)</span>
                <span>{formatCurrency(booking.amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};