import { Calendar } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const BookingHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 to-primary-light/10 py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-white/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            Mes Réservations
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Gérez vos réservations et suivez l'historique de vos séjours avec {siteConfig.website.name}
          </p>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-xl hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-xl hidden lg:block"></div>
    </div>
  );
};

export default BookingHeader;