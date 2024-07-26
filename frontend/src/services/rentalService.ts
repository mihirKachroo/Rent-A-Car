import apiClient from './apiClient';
import { Listing } from '../types';
import { mapToListing } from '../utils';

const rentListing = async (
  userId: string,
  listingId: string
): Promise<void> => {
  await apiClient.post('/rentals', { userId, listingId });
};

const getUserRentals = async (userId: string): Promise<any> => {
  const response = await apiClient.get(`/rentals/${userId}`);
  return response.data;
};

export default {
  rentListing,
  getUserRentals,
};
