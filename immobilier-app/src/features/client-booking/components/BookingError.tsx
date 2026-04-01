import { AlertCircle, RefreshCw } from "lucide-react";

interface BookingErrorProps {
  message?: string;
  onRetry?: () => void;
}

const BookingError = ({ 
  message = "Une erreur est survenue lors du chargement des réservations", 
  onRetry 
}: BookingErrorProps) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
          Erreur de chargement
        </h3>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary-light to-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingError;