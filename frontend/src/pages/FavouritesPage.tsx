import { Box, Grid, Pagination, Toolbar, Typography } from '@mui/material';
import ListingCard from '../components/ListingCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Listing } from '../types';
import { mapToListing } from '../utils';
import userService from '../services/userService';
import { useFavourites } from 'context/FavouriteContext';

const FavouritesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { favourites } = useFavourites();
  const listingsPerPage = 9;

  const { user } = useAuth();

  useEffect(() => {
    console.log('user:', user);
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedListings = favourites.slice(
    (page - 1) * listingsPerPage,
    page * listingsPerPage
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Favourite Listings
      </Typography>
      <Grid container spacing={2}>
        {paginatedListings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(favourites.length / listingsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FavouritesPage;
