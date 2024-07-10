import { Box, Grid, Pagination } from '@mui/material';
import ListingCard from '../components/ListingCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Listing } from '../types';
import { mapToListing } from '../utils';
import userService from '../services/userService';

const FavouritesPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const listingsPerPage = 9;

  const { user } = useAuth();

  useEffect(() => {
    console.log('user:', user);
  }, []);

  useEffect(() => {
    const getUserFavorites = async () => {
      if (!user?.userId) {
        console.error('User ID is not available');
        return;
      }

      try {
        const favouriteListings = await userService.getUserFavorites(
          user?.userId
        );
        setListings(favouriteListings);
      } catch (error) {
        console.error('Error fetching user favorites', error);
      }
    };

    getUserFavorites();
  }, [user]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedListings = listings.slice(
    (page - 1) * listingsPerPage,
    page * listingsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {paginatedListings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(listings.length / listingsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FavouritesPage;
