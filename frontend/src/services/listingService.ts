import apiClient from './apiClient';
import { Listing } from '../types';
import { mapToListing } from '../utils';

const getListings = async (): Promise<Listing[]> => {
  const response = await apiClient.get('/listings');
  return response.data.map((listing: any) => mapToListing(listing));
};

const getFilteredListings = async (
  maxPrice: number,
  state: 'active' | 'inactive' | 'archived',
  condition: 'fair' | 'good' | 'excellent' | 'like new' | 'new',
  sortOption: string,
  listingsPerPage: number
): Promise<Listing[]> => {
  const response = await apiClient.get('/listings/search/filters', {
    params: {
      condition,
      state_id: state,
      max_price: maxPrice,
      order_filter: sortOption,
      number_of_listings: listingsPerPage,
    },
  });
  return response.data.map((listing: any) => mapToListing(listing));
};

export default {
  getListings,
  getFilteredListings,
};
