import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import type { Booking } from "@/types/clientBooking";
import { PaymentForm } from "./PaymentForm";
import { BookingDetails } from "./BookingDetails";
import { PolicyInfo } from "./PolicyInfo";

interface CheckoutLayoutProps {
  booking: Booking;
  calculateNights: () => number;
  onPaymentError?: (error: string, is422: boolean) => void;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ 
  booking, 
  calculateNights,
  onPaymentError
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Finaliser la réservation
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-green-600">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <PaymentForm booking={booking} onPaymentError={onPaymentError} />
            <PolicyInfo />
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-4 space-y-6">
              <BookingDetails booking={booking} calculateNights={calculateNights} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};