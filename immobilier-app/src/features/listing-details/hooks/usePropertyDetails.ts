import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { fetchPropertyDetails } from "../api/propertyDetailApi";

export const usePropertyDetails = (id: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchPropertyDetails(+id);
        if (!response.data) {
          throw new Error('Property not found');
        }
        setProperty(response.data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Propriété introuvable");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
};
