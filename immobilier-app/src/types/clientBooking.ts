// export interface BookingStatus {
//   status: string
//   code: string
// }

import { Property } from "./property";
import { ClientRate } from "./rates";

// export interface BookingRating {
//   id: number
//   rate: number
//   comment: string
//   cleanliness: number
//   accuracy: number
//   location: number
//   communication: number
// }

// export interface Host {
//   id: number
//   firstName: string
//   lastName: string
//   rate: number
//   nbRates: number
//   profile: string
// }

// export interface Address {
//   country: string
//   region: string
//   city: string
//   address: string
// }

// export interface Location {
//   latitude: number
//   longitude: number
// }

// export interface Category {
//   name: string
//   value: string
// }

// export interface TypeTransaction {
//   name: string
//   value: string
// }

// export interface Etat {
//   name: string
//   code: string
// }

// export interface Feature {
//   id: number
//   name: string
//   description: string
//   icon: string
// }

// export interface Media {
//   id: number
//   url: string
// }

// export interface RealEstate {
//   id: number
//   title: string
//   description: string
//   surface: number
//   price: number
//   nbRooms: number
//   nbBathroom: number
//   dateConstruction?: string
//   nbEtages?: number
//   etage?: number
//   rate?: number
//   nbRate?: number
//   hasElevator?: boolean
//   hasParking?: boolean
//   hasGarage?: boolean
//   isFavorite?: boolean
//   host: {
//     id: number
//     firstName: string
//     lastName: string
//     profile: string
//     rate: number
//     nbRates: number
//   }
//   media: {
//     id: number
//     url: string
//     // isCover: boolean
//   }[]
// }

// export interface Booking {
//   id: number
//   amount: number
//   checkin: string
//   checkout: string
//   nbGuest: number
//   isRatable: boolean
//   realestate: RealEstate
//   status: BookingStatus
//   myRate: BookingRating | null
//   hostRate: BookingRating | null
// }

// export interface BookingPagination {
//   total: number
//   per_page: number
//   current_page: number
//   last_page: number
//   from: number
//   to: number
// }

// export interface BookingsResponse {
//   items: Booking[]
//   pagination: BookingPagination
// }

// export interface CreateBookingRequest {
//   checkin: string
//   checkout: string
//   guest: number
//   realestate: number
// }

// export interface RateBookingRequest {
//   comment: string
//   cleanliness: number
//   communication: number
//   accuracy: number
//   location: number
// }

export interface Booking {
  id: number;
  amount: number;
  checkin: string;
  checkout: string;
  nbGuest: number;
  isRatable: boolean;
  realestate: Property;
  status: BookingStatus;
  myRate: ClientRate | null;
  hostRate: null;
}

export interface BookingStatus {
  status: string;
  code: string;
}
