"use client";

import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Mail, Phone } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Conditions générales - ${siteConfig.website.name}`;
  }, []);

  const sections = [
    {
      icon: CheckCircle,
      title: "1. Acceptation des conditions",
      content: [
        "En accédant et en utilisant ce site web, vous acceptez d'être lié par les termes et conditions de service énoncés ci-dessous.",
        "Si vous n'acceptez pas l'ensemble des termes et conditions de cet accord, vous ne devez pas accéder au site web ou utiliser ses services.",
        "Ces conditions d'utilisation s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent ou utilisent le service."
      ]
    },
    {
      icon: FileText,
      title: "2. Description du service",
      content: [
        `${siteConfig.website.name} est une plateforme immobilière qui met en relation propriétaires et locataires/acheteurs potentiels.`,
        "Nous fournissons un service de mise en relation et ne sommes pas responsables des transactions effectuées entre les parties.",
        "Les utilisateurs sont entièrement responsables de leurs interactions et transactions avec d'autres utilisateurs."
      ]
    },
    {
      icon: AlertTriangle,
      title: "3. Responsabilités de l'utilisateur",
      content: [
        "Vous vous engagez à utiliser le service uniquement à des fins légales et de manière conforme à ces conditions.",
        "Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe.",
        "Vous acceptez de notifier immédiatement toute utilisation non autorisée de votre compte.",
        "Vous ne devez pas :",
        "• Publier du contenu faux, trompeur ou frauduleux",
        "• Violer les droits de propriété intellectuelle d'autrui",
        "• Harceler, menacer ou intimider d'autres utilisateurs",
        "• Utiliser le service à des fins commerciales non autorisées"
      ]
    },
    {
      icon: XCircle,
      title: "4. Contenu interdit",
      content: [
        "Il est strictement interdit de publier du contenu qui :",
        "• Est illégal, nuisible, menaçant, abusif, harcelant, diffamatoire",
        "• Viole les droits de propriété intellectuelle",
        "• Contient des virus ou codes malveillants",
        "• Fait la promotion d'activités illégales",
        "• Est offensant, obscène ou inapproprié",
        "Nous nous réservons le droit de supprimer tout contenu qui viole ces règles."
      ]
    }
  ];

  const liabilitySection = {
    icon: Scale,
    title: "5. Limitation de responsabilité",
    content: [
      `${siteConfig.website.name} agit uniquement comme une plateforme de mise en relation entre les utilisateurs.`,
      "Nous ne sommes pas responsables des transactions, communications ou interactions entre les utilisateurs.",
      "Nous ne garantissons pas l'exactitude, la complétude ou la fiabilité du contenu publié par les utilisateurs.",
      "Notre responsabilité totale envers vous pour tous dommages ne dépassera pas le montant que vous avez payé pour utiliser notre service au cours des 12 derniers mois."
    ]
  };

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
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Conditions générales
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Les termes et conditions qui régissent l'utilisation de notre plateforme immobilière.
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
                Bienvenue sur {siteConfig.website.name}. Ces conditions générales d'utilisation ("Conditions") 
                régissent votre utilisation de notre site web et de nos services. Veuillez les lire attentivement 
                avant d'utiliser notre plateforme.
              </p>
            </div>

            {/* Main Sections */}
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

              {/* Liability Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2">
                    {liabilitySection.title}
                  </h3>
                </div>
                <div className="ml-16 space-y-3">
                  {liabilitySection.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Modification of Terms */}
            <div className="mt-12 p-6 bg-orange-50 rounded-xl border border-orange-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Modification des conditions</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications prendront effet immédiatement après leur publication sur ce site.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Il est de votre responsabilité de consulter régulièrement ces conditions. 
                L'utilisation continue du service après la modification constitue votre acceptation des nouvelles conditions.
              </p>
            </div>

            {/* Termination */}
            <div className="mt-12 p-6 bg-red-50 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Résiliation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous pouvons suspendre ou résilier votre accès au service à tout moment, 
                avec ou sans préavis, pour toute raison, notamment si vous violez ces conditions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Vous pouvez également résilier votre compte à tout moment en nous contactant.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Droit applicable</h3>
              <p className="text-gray-600 leading-relaxed">
                Ces conditions sont régies par les lois du Royaume du Maroc. 
                Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux marocains.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Questions sur nos conditions ?</h3>
              <p className="text-gray-600 mb-6">
                Si vous avez des questions concernant ces conditions générales, n'hésitez pas à nous contacter :
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

export default TermsOfServicePage;