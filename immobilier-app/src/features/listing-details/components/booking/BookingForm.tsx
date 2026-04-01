"use client";

import { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Property } from "@/types/property";
import { formatCurrency } from "@/utils/formaters";
import { useAuth } from "@/context/authentication/auth-context";
import { useAuthModal } from "@/context/authentication/auth-modal-context";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { bookProperty } from "../../api/propertyDetailApi";
import { useNavigate } from "react-router-dom";
import { PropertyDatePicker } from "./PropertyDatePicker";

export const BookingForm = ({ property }: { property: Property }) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { openAuthModal, isOpen } = useAuthModal();

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const total = nights * property.price;
  const canBook = nights > 0;

  const onClientBook = async () => {
    if (!isAuthenticated) {
      if (!isOpen) {
        openAuthModal("login");
      }
      return;
    }
    const checkinDate = format(checkIn!, "yyyy-MM-dd");
    const checkoutDate = format(checkOut!, "yyyy-MM-dd");
    const request = {
      checkin: checkinDate,
      checkout: checkoutDate,
      guest: guests,
      realestate: property.id,
    };
    await bookProperty(request);
    navigate("/client/bookings");
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-light p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl lg:text-2xl font-bold text-white">
                {formatCurrency(property.price)}
              </div>
              <div className="text-primary-foreground/80 text-sm">par nuit</div>
            </div>
            <div className="flex items-center gap-1 text-primary-foreground/80">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{property.rate}</span>
              <span className="text-sm">({property.rateCount})</span>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-4">
          {/* Date Selection Dropdown */}
          <div className="space-y-3">
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <button className="w-full border border-gray-300 rounded-xl p-3 lg:p-4 hover:border-primary transition-colors text-left group">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      <div>
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Arrivée
                        </div>
                        <div className="text-sm text-gray-900">
                          {checkIn ? format(checkIn, "dd MMM", { locale: fr }) : "-- --"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Départ
                        </div>
                        <div className="text-sm text-gray-900">
                          {checkOut ? format(checkOut, "dd MMM", { locale: fr }) : "-- --"}
                        </div>
                      </div>
                    </div>
                    <div className="ml-3">
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 z-50" 
                align="center"
                sideOffset={8}
              >
                <PropertyDatePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onCheckInChange={(date) => {
                    setCheckIn(date);
                    if (date && checkOut) {
                      setDatePickerOpen(false);
                    }
                  }}
                  onCheckOutChange={(date) => {
                    setCheckOut(date);
                    if (date) {
                      setDatePickerOpen(false);
                    }
                  }}
                  reservedDates={property.reservedDates}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Selection - Inline Design */}
          <div className="border border-gray-300 rounded-xl p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Voyageurs
                </div>
                <div className="text-sm text-gray-900">
                  {guests} {guests === 1 ? "voyageur" : "voyageurs"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-gray-300"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                >
                  <span className="text-lg font-medium">–</span>
                </Button>
                <span className="min-w-[2rem] text-center font-medium text-sm">{guests}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full border-gray-300"
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  disabled={guests >= 20}
                >
                  <span className="text-lg font-medium">+</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          {nights > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700 text-sm">
                  <span className="underline">
                    {formatCurrency(property.price)} × {nights} nuit{nights > 1 ? "s" : ""}
                  </span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between text-base lg:text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Book Button */}
          <Button
            className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white py-3 lg:py-4 font-semibold text-base lg:text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canBook}
            onClick={onClientBook}
          >
            {!canBook ? "Sélectionnez vos dates" : "Réserver"}
          </Button>

          {canBook && (
            <p className="text-center text-xs lg:text-sm text-gray-600">
              Vous ne serez pas débité pour le moment
            </p>
          )}
        </div>
      </div>

      {/* Property Info Summary */}
      <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={property.media?.[0]?.url} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate text-sm lg:text-base">
              {property.title}
            </h4>
            <div className="flex items-center gap-1 text-xs lg:text-sm text-gray-600 mt-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{property.address.city.name}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 fill-current text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs">{property.rate}</span>
              </div>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-600">{property.rateCount} avis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
