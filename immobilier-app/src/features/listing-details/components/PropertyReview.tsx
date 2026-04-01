import { FC, useEffect, useState } from "react";
import { Property } from "@/types/property";
import { Review } from "@/types/review";
import { fetchPropertyReviews } from "../api/propertyDetailApi";
import {
  Loader2,
  Star,
  Sparkles,
  Target,
  MapPin,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const REVIEWS_PER_PAGE = 6;

export const PropertyReview: FC<{ property: Property }> = ({ property }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  useEffect(() => {
    const fetchReviewsData = async () => {
      setLoading(true);
      try {
        const response = await fetchPropertyReviews(property.id);
        setReviews(response.data.items);
      } catch (err) {
        console.error("Error fetching reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, [property]);

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Avis des voyageurs</h2>
            <p className="text-gray-600">Découvrez les expériences de nos clients</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-500">Chargement des avis...</p>
          </div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-bold">
                    {review.client.firstName.charAt(0)}{review.client.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {review.client.firstName} {review.client.lastName}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(review.rate)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-sm text-gray-700">
                        {review.rate.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {review.comment}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    <span className="text-gray-600">Propreté:</span>
                    <span className="font-semibold">{review.cleanliness}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-gray-600">Précision:</span>
                    <span className="font-semibold">{review.accuracy}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-purple-500" />
                    <span className="text-gray-600">Localisation:</span>
                    <span className="font-semibold">{review.location}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3 h-3 text-orange-500" />
                    <span className="text-gray-600">Communication:</span>
                    <span className="font-semibold">{review.communication}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            {reviews.length > visibleCount ? (
              <Button
                onClick={() => setVisibleCount(prev => prev + REVIEWS_PER_PAGE)}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Afficher plus d'avis
              </Button>
            ) : (
              visibleCount > REVIEWS_PER_PAGE && (
                <Button
                  onClick={() => setVisibleCount(REVIEWS_PER_PAGE)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Afficher moins
                </Button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun avis pour le moment</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Cette propriété n'a pas encore reçu d'avis. Soyez le premier à partager votre expérience !
          </p>
        </div>
      )}
    </div>
  );
};
