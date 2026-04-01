export interface BecomeHostFormData {
  tel: string;
  city: number;
  address: string;
  rib?: string;
  identityFront: File;
  identityBack: File;
  profile: File;
}

export interface Region {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  region_id: number;
}

export interface FileTypes {
  identityFront: File | null;
  identityBack: File | null;
  profile: File | null;
}

export interface BecomeHostFormState {
  city: number;
  address: string;
  regionId: number;
  rib: string;
}
