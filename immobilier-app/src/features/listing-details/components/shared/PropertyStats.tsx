import { Bed, Bath, Square, Building2 } from "lucide-react";

interface Property {
  nbRooms: number;
  nbBathroom: number;
  surface: number;
  nbEtages: number;
}

interface PropertyStatsProps {
  property: Property;
  layout?: "inline" | "grid";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PropertyStats = ({ 
  property, 
  layout = "inline", 
  size = "md",
  className = "" 
}: PropertyStatsProps) => {
  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  const layoutClasses = {
    inline: "flex flex-wrap items-center gap-4",
    grid: "grid grid-cols-2 lg:grid-cols-4 gap-6"
  };

  const StatItem = ({ icon: Icon, value, label }: { icon: any, value: number, label: string }) => {
    if (layout === "grid") {
      return (
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm font-medium text-gray-600">{label}</div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Icon className={`${iconSizeClasses[size]} text-primary`} />
        <span className={`font-medium ${textSizeClasses[size]} text-gray-700`}>
          {value} {label}
        </span>
      </div>
    );
  };

  return (
    <div className={`${layoutClasses[layout]} ${textSizeClasses[size]} text-gray-600 ${className}`}>
      <StatItem icon={Bed} value={property.nbRooms} label="chambres" />
      <StatItem icon={Bath} value={property.nbBathroom} label="sdb" />
      <StatItem icon={Square} value={property.surface} label="m²" />
      <StatItem icon={Building2} value={property.nbEtages} label="étages" />
    </div>
  );
};
