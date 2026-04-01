"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isAfter, 
  isBefore, 
  parseISO,
  isWithinInterval,
  addDays,
  getDay
} from "date-fns";
import { fr } from "date-fns/locale";
import type { ReservedDate } from "@/types/property";

interface PropertyDatePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
  reservedDates?: ReservedDate[];
  minNights?: number;
}

export const PropertyDatePicker: React.FC<PropertyDatePickerProps> = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  reservedDates = [],
  minNights = 1,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reservedRanges = useMemo(() => {
    return reservedDates.map(range => ({
      start: parseISO(range.checkin),
      end: parseISO(range.checkout),
    }));
  }, [reservedDates]);

  const isDateReserved = (date: Date) => {
    return reservedRanges.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const findNextAvailableCheckout = (checkinDate: Date) => {
    const conflictingReservations = reservedRanges
      .filter(range => isAfter(range.start, checkinDate))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    
    if (conflictingReservations.length === 0) {
      return null;
    }
    
    return addDays(conflictingReservations[0].start, -1);
  };

  const hasReservedDatesBetween = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return false;
    
    return reservedRanges.some(range => {
      const reservationStart = range.start;
      const reservationEnd = range.end;
      
      const startsWithin = isAfter(reservationStart, startDate) && 
                          (isBefore(reservationStart, endDate) || isSameDay(reservationStart, endDate));
      
      const endsWithin = (isAfter(reservationEnd, startDate) || isSameDay(reservationEnd, startDate)) && 
                        isBefore(reservationEnd, endDate);
      
      const encompasses = (isBefore(reservationStart, startDate) || isSameDay(reservationStart, startDate)) && 
                         (isAfter(reservationEnd, endDate) || isSameDay(reservationEnd, endDate));
      
      const isEncompassed = isAfter(reservationStart, startDate) && isBefore(reservationEnd, endDate);
      
      return startsWithin || endsWithin || encompasses || isEncompassed;
    });
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    
    if (isDateReserved(date)) return true;

    if (isSelectingCheckOut && checkIn) {
      if (isBefore(date, checkIn) || isSameDay(date, checkIn)) return true;
      
      const daysDiff = Math.ceil((date.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff < minNights) return true;
      
      if (hasReservedDatesBetween(checkIn, date)) return true;
      
      const maxAvailableCheckout = findNextAvailableCheckout(checkIn);
      if (maxAvailableCheckout && isAfter(date, maxAvailableCheckout)) return true;
    }

    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut) || isBefore(date, checkIn)) {
      onCheckInChange(date);
      onCheckOutChange(undefined);
      setIsSelectingCheckOut(true);
    } else {
      if (!hasReservedDatesBetween(checkIn, date)) {
        onCheckOutChange(date);
        setIsSelectingCheckOut(false);
      }
    }
  };

  const getCalendarDays = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    
    const startDay = getDay(start);
    const mondayStart = startDay === 0 ? 6 : startDay - 1;
    
    const calendarStart = addDays(start, -mondayStart);
    const calendarEnd = addDays(end, 41 - mondayStart - (end.getDate() - 1));
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const isInRange = (date: Date) => {
    if (!checkIn) return false;
    if (checkOut) {
      return isWithinInterval(date, { start: checkIn, end: checkOut });
    }
    return false;
  };

  const isRangeStart = (date: Date) => checkIn && isSameDay(date, checkIn);
  const isRangeEnd = (date: Date) => checkOut && isSameDay(date, checkOut);

  const days = getCalendarDays(currentMonth);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h3 className="text-sm font-semibold text-gray-900">
            {format(currentMonth, "MMMM yyyy", { locale: fr })}
          </h3>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-gray-500 font-medium mb-1">ARRIVÉE</div>
              <div className="text-gray-900 font-semibold">
                {checkIn ? format(checkIn, "dd MMM", { locale: fr }) : "Sélectionner"}
              </div>
            </div>
            <div>
              <div className="text-gray-500 font-medium mb-1">DÉPART</div>
              <div className="text-gray-900 font-semibold">
                {checkOut ? format(checkOut, "dd MMM", { locale: fr }) : "Sélectionner"}
              </div>
            </div>
          </div>
        </div>

        {isSelectingCheckOut && checkIn && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              {(() => {
                const maxAvailable = findNextAvailableCheckout(checkIn);
                if (maxAvailable) {
                  return `Vous pouvez réserver jusqu'au ${format(maxAvailable, "dd MMM", { locale: fr })}`;
                }
                return "Sélectionnez votre date de départ";
              })()}
            </p>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isDisabled = isDateDisabled(date);
            const isSelected = isRangeStart(date) || isRangeEnd(date);
            const isInCurrentRange = isInRange(date);
            const isToday = isSameDay(date, today);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isDisabled || !isCurrentMonth}
                className={cn(
                  "relative h-8 w-8 text-xs transition-all duration-200 rounded-md",
                  "hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan-500",
                  {
                    "text-gray-900": isCurrentMonth,
                    "text-gray-300": !isCurrentMonth,
                    "opacity-40 cursor-not-allowed line-through text-red-400": isDisabled && isCurrentMonth,
                    "hover:bg-transparent": isDisabled,
                    "bg-cyan-600 text-white hover:bg-cyan-700": isSelected,
                    "bg-cyan-100 text-cyan-800": isInCurrentRange && !isSelected,
                    "ring-1 ring-cyan-400": isToday && !isSelected && !isDisabled,
                  }
                )}
              >
                {format(date, "d")}
                
                {isDateReserved(date) && isCurrentMonth && (
                  <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {(checkIn || checkOut) && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onCheckInChange(undefined);
                onCheckOutChange(undefined);
                setIsSelectingCheckOut(false);
              }}
              className="text-cyan-600 hover:text-cyan-700 text-xs"
            >
              Effacer les dates
            </Button>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
              <span>Sélectionné</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-200 rounded-full line-through"></div>
              <span>Indisponible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};