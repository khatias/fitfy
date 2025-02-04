export interface Profile {
  first_name: string;
  last_name: string;
  user_name: string;
  location: string;
  phone_number: string;
  birthday: string;
  email: string;
  avatar_url: string | null;
  lastSignInAt: string | null;
  address_street:string;
  address_city:string;
  address_state:string;
  address_postal_code:string;
  address_country:string
  product_count:number;
  subscription_name:string;
}
