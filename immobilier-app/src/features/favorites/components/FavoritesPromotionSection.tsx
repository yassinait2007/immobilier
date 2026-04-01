import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FavoritesPromotionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Découvrez Plus de Propriétés
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explorez notre catalogue complet et trouvez encore plus de propriétés qui correspondent à vos critères.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/categories')}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Explorer toutes les propriétés
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPromotionSection;