import PropertyCard from '@/components/PropertyCard';
import MyPagination from '@/components/MyPagination';
import type { Property } from '@/types/property';
import type { Pagination } from '@/types/apiResponsePagination';

interface FavoritesGridProps {
  favorites: Property[];
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

const FavoritesGrid = ({ favorites, pagination, onPageChange }: FavoritesGridProps) => {
  return (
    <>
      {pagination && (
        <div className="mb-6">
          <p className="text-gray-600">
            {pagination.last_page > 1 ? (
              `Page ${pagination.current_page} sur ${pagination.last_page} • ${favorites.length} propriété${favorites.length > 1 ? 's' : ''} affichée${favorites.length > 1 ? 's' : ''} sur ${pagination.total}`
            ) : (
              `${pagination.total} propriété${pagination.total > 1 ? 's' : ''} favorite${pagination.total > 1 ? 's' : ''}`
            )}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {favorites.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>

      {pagination && pagination.last_page > 1 && (
        <MyPagination
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default FavoritesGrid;