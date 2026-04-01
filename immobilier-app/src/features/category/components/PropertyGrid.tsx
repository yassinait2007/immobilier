import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { ContentLoading } from "@/components/ui/loading";
import MyPagination from "@/components/MyPagination";
import EmptyState from "./EmptyState";
import type { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReset: () => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        {loading ? (
          <ContentLoading 
            message="Application des filtres..." 
            description="Recherche des propriétés correspondantes"
          />
        ) : properties.length === 0 ? (
          <EmptyState onReset={onReset} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <MyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyGrid;
