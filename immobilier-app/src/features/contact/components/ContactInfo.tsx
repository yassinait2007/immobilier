"use client";

import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Users,
  Heart,
  Star
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const ContactInfo: React.FC = () => {




  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      primary: siteConfig.contact.email,
      secondary: "Réponse rapide",
      gradient: "from-blue-500 to-blue-600",
      action: () => window.open(`mailto:${siteConfig.contact.email}`)
    },
    {
      icon: Phone,
      title: "Téléphone",
      primary: siteConfig.contact.phone,
      secondary: siteConfig.businessHours.weekdays,
      gradient: "from-green-500 to-green-600",
      action: () => window.open(`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`)
    },
    {
      icon: MapPin,
      title: "Adresse",
      primary: siteConfig.contact.address.full,
      secondary: "Sur rendez-vous",
      gradient: "from-purple-500 to-purple-600",
      action: () => window.open(`https://maps.google.com/search/${encodeURIComponent(siteConfig.contact.address.full)}`)
    }
  ];

  const stats = [
    {
      icon: Users,
      number: siteConfig.company.stats.clients,
      label: "Clients satisfaits",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      number: siteConfig.company.stats.properties,
      label: "Propriétés favorites",
      color: "text-red-500"
    },
    {
      icon: Star,
      number: siteConfig.company.stats.rating,
      label: "Note moyenne",
      color: "text-yellow-500"
    },
    {
      icon: MessageCircle,
      number: siteConfig.company.stats.responseTime,
      label: "Temps de réponse",
      color: "text-green-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-primary-light" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Contactez-nous
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-primary bg-gradient-to-r from-primary-light to-primary bg-clip-text hover:text-transparent mb-6 leading-tight transition-all duration-300">
          Nous sommes là pour vous aider
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
          concernant nos propriétés et services. N'hésitez pas à nous contacter !
        </p>
      </div>

      {/* Contact Methods */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Comment nous contacter
        </h3>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div
                key={index}
                onClick={method.action}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {method.title}
                  </h4>
                  <p className="text-gray-800 font-medium truncate">{method.primary}</p>
                  <p className="text-sm text-gray-500">{method.secondary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl p-8 border border-primary/10">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Pourquoi nous choisir ?
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-3 ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;