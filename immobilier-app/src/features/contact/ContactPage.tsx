"use client";

import React, { useEffect } from 'react';
import { 
  ContactHeader, 
  ContactSocialMedia, 
  ContactForm, 
  ContactLocation 
} from './components';
import ContactInfo from './components/ContactInfo';
import { siteConfig } from '@/config/siteConfig';

const ContactPage: React.FC = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Contact - ${siteConfig.website.name}`;
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ContactHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Right Column - Contact Form */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContactLocation />
      </div>

      <ContactSocialMedia />
    </div>
  );
};

export default ContactPage;