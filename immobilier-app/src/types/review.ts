import { ClientProfile } from "./clientProfile";
import { HostProfile } from "./hostProfile";

// Base review interface
export interface BaseReview {
  id: number;
  rate: number;
  comment: string;
  communication: number;
}

// Client review (written by host about client)
export interface ClientReview extends BaseReview {
  cleanliness: number;
  observanceHouseRules: number;
  host: HostProfile;
}

// Host review (written by client about host)
export interface HostReview extends BaseReview {
  cleanliness: number;
  accuracy: number;
  location: number;
  client: ClientProfile;
}

export interface Review {
  id: number;
  rate: number;
  comment: string;
  cleanliness: number;
  accuracy: number;
  location: number;
  communication: number;
  client: ClientProfile;
}
