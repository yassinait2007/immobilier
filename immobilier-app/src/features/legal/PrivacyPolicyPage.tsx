"use client";

import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Shield, Lock, Eye, Settings, Mail, Phone } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Politique de confidentialité - ${siteConfig.website.name}`;
  }, []);

  const sections = [
    {
      icon: Shield,
      title: "1. Collecte des informations",
      content: [
        "Nous collectons des informations lorsque vous vous inscrivez sur notre site, passez une commande, vous abonnez à notre newsletter, répondez à une enquête ou remplissez un formulaire.",
        "Les informations collectées incluent votre nom, votre adresse e-mail, numéro de téléphone et/ou carte de crédit.",
        "Nous collectons également des informations sur votre utilisation de notre site web via des cookies et des technologies similaires."
      ]
    },
    {
      icon: Lock,
      title: "2. Utilisation des informations",
      content: [
        "Toute information que nous collectons auprès de vous peut être utilisée pour :",
        "• Personnaliser votre expérience et répondre à vos besoins individuels",
        "• Fournir un contenu publicitaire personnalisé",
        "• Améliorer notre site web",
        "• Améliorer le service client et vos besoins de prise en charge",
        "• Vous contacter par e-mail",
        "• Administrer un concours, une promotion, ou une enquête"
      ]
    },
    {
      icon: Eye,
      title: "3. Confidentialité du commerce en ligne",
      content: [
        "Nous sommes les seuls propriétaires des informations collectées sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et/ou une transaction.",
        "Nous utilisons des mesures de sécurité appropriées pour protéger contre la perte, l'utilisation abusive ou la modification des informations personnelles."
      ]
    },
    {
      icon: Settings,
      title: "4. Divulgation à des tiers",
      content: [
        "Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.",
        "Nous pensons qu'il est nécessaire de partager des informations afin d'enquêter, de prévenir ou de prendre des mesures concernant des activités illégales, fraudes présumées, situations impliquant des menaces potentielles à la sécurité physique de toute personne, violations de nos conditions d'utilisation, ou quand la loi nous y oblige."
      ]
    }
  ];

  const contactInfo = [
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
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Politique de confidentialité
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, 
              utilisons et protégeons vos informations personnelles.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Chez {siteConfig.website.name}, nous nous engageons à protéger votre vie privée. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, 
                divulguons et protégeons vos informations lorsque vous utilisez notre service.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mt-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="ml-16 space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cookies Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Utilisation des cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Les cookies nous aident à comprendre comment vous utilisez notre site et nous permettent d'améliorer nos services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez choisir de désactiver les cookies dans les paramètres de votre navigateur, 
                mais cela peut affecter le fonctionnement de certaines parties de notre site.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mt-12 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Vos droits</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vous avez le droit de demander l'accès, la rectification ou la suppression de vos données personnelles. 
                Vous pouvez également vous opposer au traitement de vos données ou demander la limitation du traitement.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Pour exercer ces droits, veuillez nous contacter en utilisant les informations de contact ci-dessous.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Questions ou préoccupations ?</h3>
              <p className="text-gray-600 mb-6">
                Si vous avez des questions concernant cette politique de confidentialité, n'hésitez pas à nous contacter :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{contact.label}</p>
                        <p className="text-gray-600">{contact.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;