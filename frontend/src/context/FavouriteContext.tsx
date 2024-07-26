import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import userService from '../services/userService';
import { useAuth } from './AuthContext';
import { Listing } from 'types';

interface FavouriteContextType {
  favouriteIds: string[];
  favourites: Listing[];
  fetchFavourites: (userId: string) => Promise<void>;
  addFavourite: (userId: string, listing: Listing) => Promise<void>;
  removeFavourite: (userId: string, listingId: string) => Promise<void>;
}

const FavouriteContext = createContext<FavouriteContextType | undefined>(
  undefined
);

export const FavouriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<Listing[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchFavourites(user.userId);
  }, [user]);

  const fetchFavourites = async (userId: string) => {
    try {
      const favouriteListings = await userService.getUserFavorites(userId);
      const ids = favouriteListings.map((favourite) => favourite.listingId);
      setFavouriteIds(ids);
      setFavourites(favouriteListings);
    } catch (error) {
      console.error('Failed to fetch favourites:', error);
    }
  };

  const addFavourite = async (userId: string, listing: Listing) => {
    try {
      await userService.addFavourite(userId, listing.listingId);
      setFavouriteIds((prevIds) => [...prevIds, listing.listingId]);
      setFavourites((prevFavourites) => [...prevFavourites, listing]);
    } catch (error) {
      console.error('Failed to add favourite:', error);
    }
  };

  const removeFavourite = async (userId: string, listingId: string) => {
    try {
      await userService.removeFavourite(userId, listingId);
      setFavouriteIds((prevIds) => prevIds.filter((id) => id !== listingId));
      setFavourites((prevFavourites) =>
        prevFavourites.filter((listing) => listing.listingId !== listingId)
      );
    } catch (error) {
      console.error('Failed to remove favourite:', error);
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        favouriteIds,
        favourites,
        fetchFavourites,
        addFavourite,
        removeFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouriteContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouriteProvider');
  }
  return context;
};
