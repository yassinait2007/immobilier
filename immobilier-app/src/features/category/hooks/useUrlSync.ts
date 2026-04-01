import { useSearchParams, useNavigate } from "react-router-dom";
import type { URLFilters } from "../types";

export const useUrlSync = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const updateURL = (newFilters: URLFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.category !== undefined) {
      if (newFilters.category === "all") {
        params.delete("category");
      } else {
        params.set("category", newFilters.category);
      }
    }
    
    if (newFilters.city !== undefined) {
      if (newFilters.city === "all") {
        params.delete("city");
      } else {
        params.set("city", newFilters.city);
      }
    }
    
    if (newFilters.state !== undefined) {
      if (newFilters.state === "all") {
        params.delete("state");
      } else {
        params.set("state", newFilters.state);
      }
    }
    
    if (newFilters.features !== undefined) {
      params.delete("features");
      if (newFilters.features.length > 0) {
        params.set("features", newFilters.features.join(","));
      }
    }
    
    if ('checkin' in newFilters) {
      if (newFilters.checkin) {
        params.set("checkin", newFilters.checkin);
      } else {
        params.delete("checkin");
      }
    }
    
    if ('checkout' in newFilters) {
      if (newFilters.checkout) {
        params.set("checkout", newFilters.checkout);
      } else {
        params.delete("checkout");
      }
    }
    
    if (newFilters.page !== undefined) {
      if (newFilters.page === 1) {
        params.delete("page");
      } else {
        params.set("page", newFilters.page.toString());
      }
    }
    
    navigate(`?${params.toString()}`, { replace: true });
  };

  const readFiltersFromURL = () => {
    const categoryParam = searchParams.get("category") || "all";
    const cityParam = searchParams.get("city") || "all";
    const stateParam = searchParams.get("state") || "all";
    const featuresParam = searchParams.get("features");
    const checkinParam = searchParams.get("checkin");
    const checkoutParam = searchParams.get("checkout");
    const pageParam = parseInt(searchParams.get("page") || "1");
    
    const featureIds = featuresParam 
      ? featuresParam.split(",").map(id => parseInt(id)).filter(id => !isNaN(id))
      : [];

    return {
      category: categoryParam,
      city: cityParam,
      state: stateParam,
      features: featureIds,
      checkin: checkinParam ? new Date(checkinParam) : undefined,
      checkout: checkoutParam ? new Date(checkoutParam) : undefined,
      page: pageParam,
    };
  };

  return { updateURL, readFiltersFromURL, searchParams };
};
