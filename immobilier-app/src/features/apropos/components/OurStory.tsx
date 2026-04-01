import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { MapPin, Heart, Award } from 'lucide-react';

const OurStory: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Notre histoire
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {siteConfig.website.name} a été fondée en {siteConfig.company.established} avec une vision claire : 
                  rendre l'immobilier accessible et transparent pour tous. Basés à {siteConfig.contact.address.city}, 
                  nous avons développé une expertise unique du marché immobilier marocain.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {siteConfig.company.description} Notre équipe passionnée travaille chaque jour 
                  pour vous offrir un service d'exception et vous accompagner dans la réalisation de vos projets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-lg shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ancrage local</h3>
                    <p className="text-gray-600 text-sm">
                      Une connaissance approfondie du marché d'Agadir et du Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Passion</h3>
                    <p className="text-gray-600 text-sm">
                      L'amour de l'immobilier et l'envie d'aider nos clients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-light to-primary rounded-full mb-6">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Excellence reconnue
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Notre engagement pour la qualité nous a valu la confiance de milliers de clients 
                    et une réputation d'excellence dans le secteur immobilier.
                  </p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-primary">{siteConfig.company.established}</div>
                <div className="text-sm text-gray-600">Année de création</div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{siteConfig.company.stats.rating}</div>
                <div className="text-sm text-gray-600">Note client</div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-0 transform -translate-x-4 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-primary-light/30 to-primary/30 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/4 right-0 transform translate-x-4 w-6 h-6 bg-gradient-to-br from-primary/30 to-primary-light/30 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
