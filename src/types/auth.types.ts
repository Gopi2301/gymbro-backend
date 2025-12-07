export interface SuperAdmin {
  email: string;
  id: number;
  name: string;
  role: string;
}

export interface UserMetadata {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  role: string;
}
