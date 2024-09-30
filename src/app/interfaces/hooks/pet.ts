export interface iFindManyPets {
  total: number
  records: iPet[]
}
  
export interface iPet {
  id: number
  gender: number
  name: string
  specie: number
  weight: number
  responsible_for_pet: iResponsibleForPet[]
}
  
export interface iResponsibleForPet {
  id: number
  name: string
  phone: string
  document: string
  created_at: string
  updated_at: string
  address_id: number
}
  