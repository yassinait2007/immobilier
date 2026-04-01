import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/categories');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleWhatsApp = () => {
    window.open(siteConfig.socialMedia.whatsapp.url, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à commencer votre projet ?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Rejoignez les milliers de clients qui nous font confiance pour leurs projets immobiliers. 
            Notre équipe est là pour vous accompagner à chaque étape.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={handleGetStarted}
              className="group bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Explorer nos propriétés</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={handleContact}
              className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Nous contacter</span>
            </button>

            <button 
              onClick={handleWhatsApp}
              className="group bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {siteConfig.company.stats.clients}
              </div>
              <div className="text-white/80">Clients satisfaits</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {siteConfig.company.stats.rating}
              </div>
              <div className="text-white/80">Note moyenne</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {siteConfig.company.stats.responseTime}
              </div>
              <div className="text-white/80">Temps de réponse</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-light via-white/20 to-primary-light"></div>
    </div>
  );
};

export default CallToAction;
