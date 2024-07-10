import { Listing } from '../types';
import { mapToListing } from '../utils';
import apiClient from './apiClient';

const addFavourite = async (
  userId: string,
  listingId: string
): Promise<void> => {
  const newFavourite = {
    userId,
    listingId,
  };
  await apiClient.post('/favourites', newFavourite);
};

const getUserFavorites = async (userId: string): Promise<Listing[]> => {
  const response = await apiClient.get(`/favourites/${userId}`);
  return response.data.map((listing: any) => mapToListing(listing));
};

export default {
  addFavourite,
  getUserFavorites,
};
