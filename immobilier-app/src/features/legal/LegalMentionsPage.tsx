"use client";

import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Building, User, Globe, Server, Shield, Mail, Phone, MapPin } from 'lucide-react';

const LegalMentionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Mentions légales - ${siteConfig.website.name}`;
  }, []);

  const sections = [
    {
      icon: Building,
      title: "1. Informations sur l'entreprise",
      content: [
        {
          label: "Dénomination sociale",
          value: siteConfig.website.name
        },
        {
          label: "Forme juridique",
          value: "SARL (Société à Responsabilité Limitée)"
        },
        {
          label: "Capital social",
          value: "100 000 MAD"
        },
        {
          label: "Numéro d'immatriculation",
          value: "RC 123456"
        },
        {
          label: "Identifiant fiscal",
          value: "IF 12345678"
        },
        {
          label: "Numéro de patente",
          value: "P 123456789"
        }
      ]
    },
    {
      icon: User,
      title: "2. Responsable de la publication",
      content: [
        {
          label: "Directeur de la publication",
          value: "M. Saad SAAD"
        },
        {
          label: "Fonction",
          value: "Gérant"
        },
        {
          label: "Email",
          value: siteConfig.contact.email
        }
      ]
    },
    {
      icon: Server,
      title: "3. Hébergement du site",
      content: [
        {
          label: "Hébergeur",
          value: "Vercel Inc."
        },
        {
          label: "Adresse",
          value: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis"
        },
        {
          label: "Téléphone",
          value: "+1 (559) 288-7060"
        },
        {
          label: "Site web",
          value: "vercel.com"
        }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adresse",
      value: siteConfig.contact.address.detailed
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary-light/10 py-16 lg:py-24">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Mentions légales
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Informations légales et réglementaires concernant notre site web et notre entreprise.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-8 lg:p-16">
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
              <p className="text-gray-600 leading-relaxed">
                Conformément aux dispositions de la loi marocaine, les mentions légales suivantes 
                sont fournies pour le site web {siteConfig.website.name}.
              </p>
            </div>

            {/* Company Information Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mt-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="ml-16">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-1">
                              {item.label}
                            </p>
                            <p className="text-gray-900 font-medium">
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-2">
                  4. Coordonnées de contact
                </h3>
              </div>
              <div className="ml-16">
                <div className="grid grid-cols-1 gap-4">
                  {contactInfo.map((contact, index) => {
                    const Icon = contact.icon;
                    const content = contact.href ? (
                      <a
                        href={contact.href}
                        className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                      >
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{contact.label}</p>
                          <p className="text-primary">{contact.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">{contact.label}</p>
                          <p className="text-gray-600">{contact.value}</p>
                        </div>
                      </div>
                    );

                    return (
                      <div key={index}>
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-2">
                  5. Propriété intellectuelle
                </h3>
              </div>
              <div className="ml-16 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  L'ensemble des éléments composant le site web {siteConfig.website.name} 
                  (textes, images, vidéos, logos, graphismes, icônes, etc.) sont protégés par le droit de la propriété intellectuelle.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                  sauf autorisation écrite préalable.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient 
                  sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions légales en vigueur.
                </p>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Protection des données personnelles</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel,
                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Pour exercer ces droits ou pour toute question relative au traitement de vos données personnelles, 
                vous pouvez nous contacter à l'adresse email : {siteConfig.contact.email}
              </p>
            </div>

            {/* Applicable Law */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Droit applicable et juridiction</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les présentes mentions légales sont régies par le droit marocain.
              </p>
              <p className="text-gray-600 leading-relaxed">
                En cas de litige, les tribunaux marocains seront seuls compétents. 
                Le tribunal compétent sera celui du lieu du siège social de l'entreprise, sauf disposition légale contraire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalMentionsPage;