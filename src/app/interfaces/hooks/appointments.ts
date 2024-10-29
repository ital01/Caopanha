export interface Address {
  street: string;
  neighborhood: string;
  number: string;
  zip_code: string;
  state: string;
  city: string;
  complement?: string;
}

export interface PetRegistration {
  pet_name: string;
  specie: number;
  weight: number;
  gender: number;
  date: string;
  campaign_id: number;
  responsible_name: string;
  responsible_document: string;
  place_id: number;
  phone: string;
  document: string;
  address: Address;
}
