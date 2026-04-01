import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AlertTriangle, Lock, CreditCard, Shield } from "lucide-react";
import { fetchClientSecret } from "../api/checkoutApi";
import { formatCurrency } from "@/utils/formaters";
import { useToast } from "@/utils/toast";
import { ButtonLoading, ContentLoading } from "@/components/ui/loading";
import type { Booking } from "@/types/clientBooking";

interface PaymentFormProps {
  booking: Booking;
  onPaymentError?: (error: string, is422: boolean) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingSecret, setIsLoadingSecret] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getClientSecret = async () => {
      setIsLoadingSecret(true);
      try {
        const { clientSecret } = await fetchClientSecret(booking.id);
        setClientSecret(clientSecret);
      } catch (err: any) {
        console.error("Erreur de récupération du client secret:", err);
        
        if (err.response?.status === 422) {
          onPaymentError?.("Vous n'avez pas accès à cette page", true);
          return;
        } else {
          setError(err.message || "Erreur lors de l'initialisation du paiement");
          onPaymentError?.(err.message || "Erreur lors de l'initialisation du paiement", false);
        }
      } finally {
        setIsLoadingSecret(false);
      }
    };
    getClientSecret();
  }, [booking.id]);

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError("Stripe n'est pas encore chargé");
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Élément de carte non trouvé");
      setIsProcessing(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${booking.realestate.host.firstName} ${booking.realestate.host.lastName}`,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message || "Erreur de paiement");
        showError(
          "Erreur de paiement",
          stripeError.message || "Une erreur s'est produite lors du paiement"
        );
      } else if (paymentIntent?.status === "succeeded") {
        success(
          "Paiement réussi!",
          "Votre réservation est maintenant confirmée. Redirection en cours..."
        );
        setTimeout(() => navigate("/client/bookings", { replace: true }), 2000);
      }
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
      showError(
        "Erreur de paiement",
        err.message || "Une erreur s'est produite lors du paiement"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        lineHeight: "1.5",
        "::placeholder": { 
          color: "#9CA3AF",
          fontWeight: "400"
        },
      },
      invalid: { 
        color: "#EF4444",
        iconColor: "#EF4444"
      },
      complete: {
        color: "#059669",
        iconColor: "#059669"
      }
    },
    disableLink: true,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre réservation</h2>
          <p className="text-gray-600">Vérifiez les détails avant de procéder au paiement</p>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/property/${booking.realestate?.id}`)}
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={booking.realestate?.media?.[0]?.url || "/placeholder.svg"}
                alt={booking.realestate?.title || "Propriété"}
                className="w-20 h-20 rounded-xl object-cover border border-gray-200 hover:border-primary transition-colors duration-200"
              />
            </button>
            <div className="flex-1">
              <button
                onClick={() => navigate(`/property/${booking.realestate?.id}`)}
                className="text-left hover:text-primary transition-colors duration-200"
              >
                <h3 className="font-semibold text-gray-900 text-lg hover:underline">{booking.realestate?.title}</h3>
              </button>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(booking.checkin).toLocaleDateString("fr-FR")} - {new Date(booking.checkout).toLocaleDateString("fr-FR")}
              </p>
              <p className="text-sm text-gray-600">
                {booking.nbGuest} {booking.nbGuest === 1 ? "invité" : "invités"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{formatCurrency(booking.amount)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Informations de paiement</h2>
              <p className="text-gray-600">Entrez vos informations de carte bancaire</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Erreur de paiement</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoadingSecret ? (
            <div className="py-8">
              <ContentLoading 
                message="Initialisation du paiement sécurisé..." 
                description="Veuillez patienter"
              />
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">
                  Informations de carte bancaire
                </label>
                <div className="p-4 border-2 border-gray-200 rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300 bg-white">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">Paiement 100% sécurisé</h3>
                    <p className="text-sm text-blue-700">
                      Vos informations sont protégées par le chiffrement SSL et Stripe. 
                      Nous ne stockons pas vos données de carte bancaire.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !stripe || !clientSecret}
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white py-4 font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isProcessing ? (
                  <ButtonLoading message="Traitement sécurisé..." size="md" />
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-3" />
                    Payer {formatCurrency(booking.amount)} en toute sécurité
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                En confirmant votre paiement, vous acceptez nos conditions d'utilisation 
                et notre politique de confidentialité.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};