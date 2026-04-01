"use client";

import React, { useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import OurValues from './components/OurValues';
import TeamSection from './components/TeamSection';
import CallToAction from './components/CallToAction';

const AproposPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `À propos - ${siteConfig.website.name}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <AboutHero />

      {/* Our Story */}
      <OurStory />

      {/* Our Values */}
      <OurValues />

      {/* Team Section */}
      <TeamSection />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default AproposPage;
