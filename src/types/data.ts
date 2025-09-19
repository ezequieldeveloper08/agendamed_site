export type UserType = "professional" | "establishment_owner"

export interface UserData {
  name: string
  email: string
  password: string
  dateOfBirth: string
  gender: string
  cellphone?: string
  document?: string
  userType: UserType
}

export interface ProfessionalData {
  type: string
  specialties: string[]
  agreements: string[]
  cost: number
  description: string
  bio: string
  document: string
  cellphone: string
}

export interface EstablishmentData {
  name: string
  description: string
  type: string
  address: {
    name: string
    uf: string
    city: string
    route: string
    district: string
    number: string
    zipcode: string
  }
}