export enum UserRole {
  ADMIN = 0,
  PATIENT = 1,
  DOCTOR = 2,
}

export enum RequestState {
  pending = 0,
  approved = 1,
  refused = 2,
}

export enum AccountState {
  pending = 0,
  active = 1,
  inactive = 2,
}

export enum OfferState {
  published = 0,
  canceled = 1,
  expired = 2,
  reserved = 3,
}
export enum RdvState {
  pending = 0,
  accepted = 1,
  refused = 2,
}
