export interface TransactionDetails {
  [key: string]: number | string;
}

export interface TransactionClient {
  id: number;
  firstName: string;
  lastName: string;
  rate: number;
  nbRates: number;
  isEmailVerified: boolean;
  profile: string;
}

export interface TransactionProperty {
  id: number;
  title: string;
  description: string;
  surface: number;
  price: number;
  dateConstruction: string;
  nbEtages: number;
  nbRooms: number;
  etage: number;
  tour360Url: string | null;
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
}

export interface TransactionBooking {
  id: number;
  amount: number;
  checkin: string;
  checkout: string;
  nbGuest: number;
  isRatable: boolean;
  client: TransactionClient;
  realestate: TransactionProperty;
  status: {
    status: string;
    code: string;
  };
  clientRate: any;
  myRate: any;
}

export interface Transaction {
  id: number;
  amount: number;
  details: TransactionDetails | null;
  booking: TransactionBooking | null;
  document: string | null;
  operationType: {
    type: string;
    code: string;
  };
}

export interface HostTransactionFilters {
  page?: number;
  perPage?: number;
}

export interface Balance {
  balance: number;
  onHold: number;
}
