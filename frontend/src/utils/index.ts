import { Listing, User } from '../types';

export const mapToListing = (data: any): Listing => {
  return {
    listingId: data.listing_id,
    ownerId: data.owner_id,
    manufacturer: data.manufacturer,
    model: data.model,
    stateId: data.state_id,
    year: data.year,
    rentTime: data.rent_time,
    description: data.description,
    price: parseFloat(data.price),
    imageUrl: data.image_url,
    postingDate: new Date(data.posting_date),
    region: data.region,
    condition: data.condition,
    paintColor: data.paint_color,
    mileage: data.mileage,
    status: data.status,
  };
};

export const mapToUser = (data: any): User => {
  return {
    userId: data.user_id,
    firstName: data.first_name,
    lastName: data.last_name,
    password: data.password,
    email: data.email,
    dateOfBirth: new Date(data.date_of_birth),
  };
};
