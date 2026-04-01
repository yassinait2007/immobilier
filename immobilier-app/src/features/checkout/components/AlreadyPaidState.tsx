import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Home, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/utils/formaters";
import type { Booking } from "@/types/clientBooking";

interface AlreadyPaidStateProps {
  booking: Booking;
  calculateNights: () => number;
}

export const AlreadyPaidState: React.FC<AlreadyPaidStateProps> = ({ booking, calculateNights }) => {
  const navigate = useNavigate();
  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Réservation déjà payée !
            </h1>
            <p className="text-green-100">
              Cette réservation a déjà été confirmée et payée
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex gap-4">
                <img
                  src={booking.realestate?.media?.[0]?.url || "/placeholder.svg"}
                  alt={booking.realestate?.title || "Propriété"}
                  className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {booking.realestate?.title}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Home className="w-4 h-4" />
                      <span>
                        {booking.realestate?.nbRooms} chambres
                        {booking.realestate?.nbBathroom && ` • ${booking.realestate.nbBathroom} sdb`}
                      </span>
                    </div>
                    {booking.realestate?.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>📍</span>
                        <span>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-blue-700 font-medium">Arrivée</div>
                <div className="text-blue-900 font-semibold">
                  {new Date(booking.checkin).toLocaleDateString("fr-FR", {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-blue-700 font-medium">Départ</div>
                <div className="text-blue-900 font-semibold">
                  {new Date(booking.checkout).toLocaleDateString("fr-FR", {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-green-700">Statut du paiement</span>
                <span className="text-sm font-semibold text-green-800 bg-green-200 px-2 py-1 rounded-full">
                  {booking.status.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-900">Montant payé</span>
                <span className="text-xl font-bold text-green-900">
                  {formatCurrency(booking.amount)}
                </span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                Pour {nights} {nights === 1 ? "nuit" : "nuits"} • {booking.nbGuest} {booking.nbGuest === 1 ? "invité" : "invités"}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/client/bookings")}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white py-5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Voir mes réservations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 py-4 rounded-xl font-medium"
              >
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};