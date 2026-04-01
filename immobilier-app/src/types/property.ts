import { Address } from "./Address";


export interface Location {
  latitude: number;
  longitude: number;
}

export interface Category {
  name: string;
  value: string;
}

export interface TypeTransaction {
  name: string;
  value: string;
}

export interface Etat {
  name: string;
  value: string;
}

export interface Host {
  id: number;
  firstName: string;
  lastName: string;
  rate: number;
  nbRates: number;
  profile: string;
  isEmailVerified: boolean;
  isIdentityVerified: boolean;
}

export interface Feature {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Media {
  id: number;
  url: string;
}

export interface ReservedDate {
  checkin: string;
  checkout: string;
}

export interface Property {
  id: number;
  title: string;
  description: string;
  isFavorite?: boolean;
  surface: number;
  price: number;
  dateConstruction: string;
  nbEtages: number;
  nbRooms: number;
  etage: number;
  nbBathroom: number;
  rate: number;
  rateCount: number;
  address: Address;
  location: Location;
  category: Category;
  typeTransaction: TypeTransaction;
  etat: Etat;
  host: Host;
  features: Feature[];
  media: Media[];
  isReservable?: boolean;
  reservedDates?: ReservedDate[];
  tour360Url?: string;
}
