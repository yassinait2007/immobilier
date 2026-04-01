interface HomeCallToActionProps {
  onGetStarted: () => void;
  onContactUs: () => void;
}

const HomeCallToAction = ({ onGetStarted, onContactUs }: HomeCallToActionProps) => {
  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Trouver Votre Propriété ?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui ont trouvé leur maison de rêve avec nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Commencer Maintenant
            </button>
            <button 
              onClick={onContactUs}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105"
            >
              Nous Contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCallToAction;