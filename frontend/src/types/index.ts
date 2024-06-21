export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
}

export interface Listing {
  listing_id: string;
  owner_id: string;
  manufacturer: string;
  model: string;
  year: number;
  description: string;
  price: number;
  image_url: string;
  posting_date: string;
  region: string;
  condition: 'fair' | 'good' | 'excellent' | 'like new' | 'new';
  rent_time: number;
  paint_color: string;
  state_id: string;
  mileage: number;
  status: 'active' | 'inactive';
}

export interface Rental {
  rental_id: string;
  listing_id: string;
  user_id: string;
  rent_date: string;
  return_date: string;
  status: string;
}
