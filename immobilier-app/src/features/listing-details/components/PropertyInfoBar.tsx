import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { Share2 } from "lucide-react";

export const PropertyInfoBar = ({ property }: { property: Property }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-lg p-4 mb-6 shadow-sm">
    <div className="flex items-center">
      <div>
        <h2 className="font-medium">{`${property.address.city},${property.address.city.region.country}`}</h2>
      </div>
    </div>
    <div className="flex items-center mt-4 sm:mt-0 space-x-4">
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        <span>Partager</span>
      </Button>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        {/* <Heart
          className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
        /> */}
        <span>Enregistré</span>
      </Button>
    </div>
  </div>
);
