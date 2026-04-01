import siteConfigData from './site-config.json';

export interface SiteConfig {
  website: {
    name: string;
    title: string;
    description: string;
    logo: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: {
      city: string;
      country: string;
      full: string;
      detailed: string;
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  socialMedia: {
    facebook: {
      handle: string;
      url: string;
    };
    instagram: {
      handle: string;
      url: string;
    };
    tiktok: {
      handle: string;
      url: string;
    };
    whatsapp: {
      url: string;
    };
  };
  businessHours: {
    weekdays: string;
    weekend: string;
    sunday: string;
  };
  company: {
    established: string;
    description: string;
    stats: {
      clients: string;
      properties: string;
      rating: string;
      responseTime: string;
    };
  };
}

export const siteConfig: SiteConfig = siteConfigData;
