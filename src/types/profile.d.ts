export interface Profile {
  firstName: string;
  lastName: string;
  userName: string;
  location: string;
  phoneNumber: string;
  birthday: string;
  email: string;
  avatar_url: string | null;
  lastSignInAt: string | null;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
