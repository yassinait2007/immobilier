import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getBookingById } from "./api/checkoutApi";
import type { Booking } from "@/types/clientBooking";
import { CheckoutLayout } from "./components/CheckoutLayout";
import { PageLoading } from "@/components/ui/loading";
import { ErrorState } from "./components/ErrorState";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [is422Error, setIs422Error] = useState(false);

  const calculateNights = () => {
    if (!booking?.checkin || !booking?.checkout) return 0;
    const start = new Date(booking.checkin);
    const end = new Date(booking.checkout);
    const diffTime = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) {
        setError("ID de réservation manquant");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await getBookingById(parseInt(id));
        setBooking(res.data);
      } catch (err: any) {
        console.error("Error fetching booking:", err);
        if (err.response?.status === 401) {
          setError("Votre session a expiré. Veuillez vous reconnecter.");
        } else {
          setError(err.message || "Erreur lors du chargement de la réservation");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handlePaymentError = (errorMessage: string, is422: boolean) => {
    setPaymentError(errorMessage);
    setIs422Error(is422);
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error || !booking) {
    return <ErrorState error={error || "Aucune information de réservation n'a été trouvée."} />;
  }

  if (is422Error && paymentError) {
    return <ErrorState error={paymentError} isAccessDenied={true} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutLayout 
        booking={booking} 
        calculateNights={calculateNights} 
        onPaymentError={handlePaymentError}
      />
    </Elements>
  );
};

export default CheckoutPage;