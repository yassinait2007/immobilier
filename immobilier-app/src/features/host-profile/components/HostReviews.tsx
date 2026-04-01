import React from "react";
import { Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HostReview } from "@/types/review";
import { formatRate } from "@/utils/formaters";
import MyPagination from "@/components/MyPagination";

interface HostReviewsProps {
  reviews: HostReview[];
  totalReviews: number;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export const HostReviews: React.FC<HostReviewsProps> = ({ 
  reviews, 
  totalReviews, 
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 w-12 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-16 w-full bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Avis des voyageurs</h2>
              <p className="text-gray-600 text-sm">Ce que disent nos clients</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-gray-600 text-xs">avis</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">Aucun avis pour le moment</h3>
            <p className="text-gray-600 text-sm">
              Les avis apparaîtront après les premiers séjours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Avis des voyageurs</h2>
            <p className="text-gray-600 text-sm">Ce que disent nos clients</p>
          </div>
          <div className="text-right bg-emerald-50 px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{totalReviews}</div>
            <div className="text-gray-600 text-xs font-medium">avis</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
            <div className="flex gap-4">
              <Link to={`/client/profile/${review.client.id}`} className="flex-shrink-0">
                <Avatar className="h-12 w-12 hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
                  <AvatarImage 
                    src={review.client.profile} 
                    alt={`${review.client.firstName} ${review.client.lastName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-medium text-sm">
                    {getInitials(review.client.firstName, review.client.lastName)}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <Link to={`/client/profile/${review.client.id}`} className="block">
                      <h4 className="font-semibold text-gray-900 text-sm truncate hover:text-blue-600 transition-colors cursor-pointer">
                        {review.client.firstName} {review.client.lastName}
                      </h4>
                    </Link>
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium mt-1">
                      <User size={10} />
                      Voyageur
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(review.rate)}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{formatRate(review.rate)}/5</span>
                  </div>
                </div>

                {review.comment && (
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      "{review.comment}"
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Propreté", value: review.cleanliness },
                      { label: "Précision", value: review.accuracy },
                      { label: "Localisation", value: review.location },
                      { label: "Communication", value: review.communication },
                    ].map((rating) => (
                      <div key={rating.label} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600 font-medium">{rating.label}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-900 font-semibold">{formatRate(rating.value)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <MyPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
