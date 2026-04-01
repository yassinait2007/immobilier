import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { HostProfileHeader } from "./components/HostProfileHeader";
import { HostReviews } from "./components/HostReviews";
import { HostProperties } from "./components/HostProperties";
import { fetchHostProfile, fetchHostReviews, fetchHostProperties } from "./api/hostProfileApi";
import { HostProfile } from "@/types/hostProfile";
import { HostReview } from "@/types/review";
import { Property } from "@/types/property";
import { PageLoading } from "@/components/ui/loading";

export const HostProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<HostProfile | null>(null);
  const [reviews, setReviews] = useState<HostReview[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const fetchReviews = async (page: number = 1) => {
    if (!id) return;
    
    setReviewsLoading(true);
    try {
      const reviewsResponse = await fetchHostReviews(parseInt(id), page, 3);
      if (reviewsResponse.success) {
        setReviews(reviewsResponse.data.items);
        setTotalReviews(reviewsResponse.data.pagination.total);
        setTotalReviewPages(reviewsResponse.data.pagination.last_page);
        setCurrentReviewPage(page);
      } else {
        console.error("Erreur lors du chargement des avis");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des avis:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewPageChange = (page: number) => {
    fetchReviews(page);
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile
        const profileResponse = await fetchHostProfile(parseInt(id));
        if (profileResponse.success) {
          setProfile(profileResponse.data);
        } else {
          setError("Impossible de charger le profil de l'hôte");
          return;
        }

        // Fetch reviews
        await fetchReviews(1);

        // Fetch properties
        setPropertiesLoading(true);
        const propertiesResponse = await fetchHostProperties(parseInt(id), 1);
        if (propertiesResponse.success) {
          // Show only first 4 properties
          setProperties(propertiesResponse.data.items.slice(0, 4));
          setTotalProperties(propertiesResponse.data.pagination.total);
        } else {
          console.error("Erreur lors du chargement des propriétés");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Une erreur est survenue lors du chargement du profil");
      } finally {
        setLoading(false);
        setPropertiesLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error || "Profil introuvable"}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Le profil de l'hôte que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft size={16} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
          >
            <ChevronLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Header (4 columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <HostProfileHeader profile={profile} />
            </div>
          </div>

          {/* Right Column - Properties and Reviews (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Properties Section */}
            <HostProperties 
              properties={properties} 
              totalProperties={totalProperties}
              isLoading={propertiesLoading}
            />

            {/* Reviews Section */}
            <HostReviews 
              reviews={reviews} 
              totalReviews={totalReviews}
              currentPage={currentReviewPage}
              totalPages={totalReviewPages}
              isLoading={reviewsLoading}
              onPageChange={handleReviewPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
