import apiClient from './apiClient';
import { Listing } from '../types';
import { mapToListing } from '../utils';

const getListingById = async (listingId: string): Promise<any> => {
  const response = await apiClient.get(`/listings/${listingId}`);
  return response.data;
};

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

const getAveragePriceByCondition = async (manufacturer: string) => {
  const response = await apiClient.get('/listings/average-price', {
    params: { manufacturer },
  });
  return response.data;
};

const getModelListingFrequency = async (): Promise<any[]> => {
  const response = await apiClient.get('/listings/listing-frequency');
  return response.data;
};

export default {
  getListingById,
  getListings,
  getFilteredListings,
  getAveragePriceByCondition,
  getModelListingFrequency,
};
