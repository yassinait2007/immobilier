"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import type { Booking } from "@/types/clientBooking";
import { rateBooking as apiRateBooking } from "../api/bookingApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onRatingSuccess?: () => void;
}

interface RatingData {
  comment: string;
  cleanliness: number;
  communication: number;
  accuracy: number;
  location: number;
}

export const RatingModal = ({
  isOpen,
  onClose,
  booking,
  onRatingSuccess,
}: RatingModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RatingData>({
    comment: "",
    cleanliness: 0,
    communication: 0,
    accuracy: 0,
    location: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      alert("Veuillez ajouter un commentaire");
      return;
    }

    if (formData.cleanliness === 0 || formData.communication === 0 || 
        formData.accuracy === 0 || formData.location === 0) {
      alert("Veuillez noter tous les critères");
      return;
    }

    setLoading(true);
    try {
      await apiRateBooking(booking.id, formData);
      onRatingSuccess?.();
      onClose();
      setFormData({
        comment: "",
        cleanliness: 0,
        communication: 0,
        accuracy: 0,
        location: 0,
      });
    } catch (error: any) {
      alert(error.message || "Erreur lors de l'envoi de l'évaluation");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({
        comment: "",
        cleanliness: 0,
        communication: 0,
        accuracy: 0,
        location: 0,
      });
    }
  };

  const renderStarRating = (
    field: keyof Pick<RatingData, 'cleanliness' | 'communication' | 'accuracy' | 'location'>, 
    label: string
  ) => {
    const ratingLabels = ['Non noté', 'Très mauvais', 'Mauvais', 'Moyen', 'Bon', 'Excellent'];

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, [field]: star }))}
              disabled={loading}
              className={`p-1 rounded transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                star <= formData[field] 
                  ? 'text-yellow-400 hover:text-yellow-500' 
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              <Star size={20} fill={star <= formData[field] ? 'currentColor' : 'none'} />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {ratingLabels[formData[field]]}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>
            Évaluer votre séjour
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        <DialogBody>
          <form onSubmit={handleSubmit} id="rate-property-form">
            <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
              {booking.realestate?.media?.[0]?.url && (
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={booking.realestate.media[0].url}
                    alt={booking.realestate.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {booking.realestate?.title}
                </h3>
                <p className="text-xs text-gray-600">
                  Du {new Date(booking.checkin).toLocaleDateString('fr-FR')} au {new Date(booking.checkout).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.realestate?.address?.city?.name || "Emplacement"}
                </p>
              </div>
            </div>

            {renderStarRating('cleanliness', 'Propreté')}
            {renderStarRating('communication', 'Communication')}
            {renderStarRating('accuracy', 'Précision de l\'annonce')}
            {renderStarRating('location', 'Emplacement')}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire public
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                placeholder="Partagez votre expérience de ce séjour..."
                disabled={loading}
                maxLength={500}
                required
              />
              <div className="mt-1 text-xs text-gray-500">
                {formData.comment.length}/500 caractères
              </div>
            </div>
          </form>
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleClose}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50 text-sm"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            form="rate-property-form"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-sm"
            disabled={loading}
          >
            {loading ? 'Envoi...' : "Publier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};