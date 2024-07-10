export interface Listing {
  listingId: string;
  ownerId: string;
  manufacturer: string;
  model: string;
  stateId: string;
  year: number;
  rentTime: number; // Ensure rent_time is between 1 and 30
  description: string;
  price: number; // Ensure price > 0
  imageUrl: string;
  postingDate: Date;
  region: string;
  condition: 'fair' | 'good' | 'excellent' | 'like new' | 'new';
  paintColor: string;
  mileage: number;
  status: 'active' | 'inactive' | 'archived';
}

export interface State {
  stateId: string;
  stateName: string;
  timeZone: string;
}

export interface Car {
  manufacturer: string;
  model: string;
  drive: 'fwd' | 'rwd' | '4wd' | 'awd';
  cylinders: number;
  transmission: 'automatic' | 'manual';
  fuel: 'gas' | 'diesel' | 'hybrid';
}

export interface Owner {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  status: 'active' | 'inactive' | 'banned';
  email: string;
  dateOfBirth: Date;
  dealerRating: number;
  dealerNumRatings: number;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: Date;
}

export interface Review {
  reviewId: string;
  author: string;
  listingId: string;
  rating: number; // Ensure rating is between 1 and 5
  comments: string;
}

export interface Rental {
  rentalId: string;
  listingId: string;
  userId: string;
  rentDate: Date;
  returnDate: Date | null;
  status: 'renting' | 'returned';
}

export interface Favorite {
  userId: string;
  listingId: string;
}
