export interface HostBooking {
  id: number;
  amount: number;
  checkin: string;
  checkout: string;
  nbGuest: number;
  isRatable: boolean;
  
  client: {
    id: number;
    firstName: string;
    lastName: string;
    rate: number;
    nbRates: number;
    profile: string;
  };
  
  realestate: {
    id: number;
    title: string;
    description: string;
    surface: number;
    price: number;
    dateConstruction: string;
    nbEtages: number;
    nbRooms: number;
    etage: number;
    nbBathroom: number;
    rate: number;
    rateCount: number;
    address: {
      address: string;
      city: {
        id: number;
        name: string;
        region: {
          id: number;
          name: string;
          country: {
            id: number;
            name: string;
          };
        };
      };
    };
    location: {
      latitude: number;
      longitude: number;
    };
    category: {
      name: string;
      value: string;
    };
    typeTransaction: {
      name: string;
      value: string;
    };
    status: {
      name: string;
      value: string;
    };
    reviewStatus: {
      name: string;
      value: string;
    };
    etat: {
      name: string;
      value: string;
    };
    features: Array<{
      id: number;
      name: string;
      description: string;
      icon: string;
    }>;
    media: Array<{
      id: number;
      url: string;
    }>;
  };
  
  status: {
    status: string;
    code: string;
  };
  
  clientRate: ClientRating | null;
  myRate: HostRating | null;
}

// Client's rating of the property/host
export interface ClientRating {
  id: number;
  rate: number;
  comment: string;
  cleanliness: number;
  accuracy: number;
  location: number;
  communication: number;
}

// Host's rating of the guest
export interface HostRating {
  id: number;
  rate: number;
  comment: string;
  cleanliness: number;
  communication: number;
  observanceHouseRules: number;
}

export interface BookingStatus {
  status: string;
  code: string;
}

export interface HostBookingFilters {
  status?: string;
  page?: number;
  perPage?: number;
}

export interface HostRatingData {
  comment: string;
  observanceHouseRules: number; // 1-5
  communication: number; // 1-5
  cleanliness: number; // 1-5
}
