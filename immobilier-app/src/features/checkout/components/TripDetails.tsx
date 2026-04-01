import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, Calendar, Users } from "lucide-react";
import type { Booking } from "@/types/clientBooking";

interface TripDetailsProps {
  booking: Booking;
}

export const TripDetails: React.FC<TripDetailsProps> = ({ booking }) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Votre voyage</h2>
          <p className="text-sm text-gray-500">Vérifiez les détails de votre séjour</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Check-in Date */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Date d'arrivée</Label>
              <p className="text-sm text-gray-600 font-medium">
                {new Date(booking.checkin).toLocaleDateString("fr-FR", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Date de départ</Label>
              <p className="text-sm text-gray-600 font-medium">
                {new Date(booking.checkout).toLocaleDateString("fr-FR", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Invités</Label>
              <p className="text-sm text-gray-600 font-medium">
                {booking.nbGuest} {booking.nbGuest === 1 ? "invité" : "invités"}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </div>

      {/* Duration Badge */}
      <div className="mt-6 p-3 bg-gradient-to-r from-primary to-primary-light rounded-xl text-center">
        <p className="text-white font-semibold">
          Durée totale: {Math.ceil((new Date(booking.checkout).getTime() - new Date(booking.checkin).getTime()) / (1000 * 60 * 60 * 24))} nuits
        </p>
      </div>
    </Card>
  );
};