import axios from 'axios';
import { Listing, User } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export const api = {
  // Authentication endpoints
  login: (email: string, password: string) =>
    axios.post<User>(`${API_BASE_URL}/auth/login`, { email, password }),

  register: (email: string, password: string, dob: string) =>
    axios.post<User>(`${API_BASE_URL}/auth/register`, { email, password, dob }),

  ownerLogin: (email: string, password: string) =>
    axios.post<User>(`${API_BASE_URL}/auth/owner-login`, { email, password }),

  ownerRegister: (email: string, password: string, dob: string) =>
    axios.post<User>(`${API_BASE_URL}/auth/owner-register`, {
      email,
      password,
      dob,
    }),

  // Listings endpoints
  getListings: () => axios.get<Listing[]>(`${API_BASE_URL}/listings`),

  createListing: (listing: Partial<Listing>) =>
    axios.post(`${API_BASE_URL}/listings`, listing),

  updateListingStatus: (listingId: string, status: string) =>
    axios.put(`${API_BASE_URL}/listings/status`, { listingId, status }),

  getFilteredListings: (filters: {
    condition: string;
    stateId: string;
    price: number;
    ownerId: string;
  }) =>
    axios.get<Listing[]>(`${API_BASE_URL}/listings/filtered`, {
      params: filters,
    }),

  // Favorites endpoints
  addFavorite: (userId: string, listingId: string) =>
    axios.post(`${API_BASE_URL}/favorites`, { userId, listingId }),

  getUserFavorites: (userId: string) =>
    axios.get<Listing[]>(`${API_BASE_URL}/favorites/${userId}`),

  // Rentals endpoints
  createRental: (rental: {
    listingId: string;
    userId: string;
    rentDate: string;
    returnDate: string;
  }) => axios.post(`${API_BASE_URL}/rentals`, rental),

  getUserRentals: (userId: string) =>
    axios.get(`${API_BASE_URL}/rentals/${userId}`),
};
