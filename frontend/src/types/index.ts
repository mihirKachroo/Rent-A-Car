export interface Listing {
  listing_id: string;
  manufacturer: string;
  model: string;
  year: number;
  description: string;
  price: number;
  condition: string;
  paint_color: string;
  mileage: number;
  image_url: string;
}

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
}
