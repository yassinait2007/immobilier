import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLoading } from "@/components/ui/loading";
import { usePropertyDetails, useFavoriteActions, useShareActions } from "./hooks";
import { PropertyError } from "./components/PropertyError";
import { PropertyHeader } from "./components/PropertyHeader";
import { PropertyInfo } from "./components/PropertyInfo";
import PropertyGallery from "./components/PropertyGallery";
import { PropertyDetails } from "./components/PropertyDetails";
import { BookingContainer } from "./components/booking/BookingContainer";
import { PropertyHost } from "./components/PropertyHost";
import { PropertyReview } from "./components/PropertyReview";
import { PropertyLocation } from "./components/PropertyLocation";
import { SimilarProperties } from "./components/SimilarProperties";

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return null;

  const { property, loading, error } = usePropertyDetails(id);
  const { isFav, favLoading, handleFavoriteClick } = useFavoriteActions(property);
  const { handleShare } = useShareActions(property);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }

  if (error || !property) {
    return <PropertyError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PropertyHeader
        onShare={handleShare}
        onFavoriteClick={handleFavoriteClick}
        isFav={isFav}
        favLoading={favLoading}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <PropertyInfo property={property} />

        <div className="mb-8">
          <PropertyGallery property={property} />
        </div>

        <div className={`grid ${property.isReservable ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-8`}>
          <div className={`${property.isReservable ? 'lg:col-span-2' : 'lg:col-span-1'} space-y-8`}>
            <PropertyDetails property={property} />
          </div>

          {property.isReservable && (
            <div className="lg:col-span-1">
              <BookingContainer property={property} />
            </div>
          )}
        </div>

        <div className="mt-12 space-y-12">
          {property.host && <PropertyHost property={property} />}
          <PropertyReview property={property} />
          <PropertyLocation property={property} />
        </div>

        <div className="mt-16">
          <SimilarProperties property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
