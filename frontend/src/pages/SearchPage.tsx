import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Toolbar,
  Pagination,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import { useAuth } from '../context/AuthContext';
import UserDrawer from '../components/UserDrawer';
import FilterComponent from '../components/AdvancedSearch';
import { Listing } from '../types';
import { mapToListing } from '../utils';
import listingService from '../services/listingService';

const SearchPage: React.FC = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<string>('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const listingsPerPage = 9;

  const { user } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await listingService.getListings();
        console.log(fetchedListings);
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings', error);
      }
    };

    fetchListings();
  }, [user]);

  const handleApplyFilters = async (filters: any) => {
    try {
      const { maxPrice, state, condition } = filters;

      const filteredListings = await listingService.getFilteredListings(
        maxPrice,
        state,
        condition,
        sortOption,
        listingsPerPage
      );
      setListings(filteredListings);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Drawer for User Information */}
      <UserDrawer />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
        {/* Search Bar */}
        {/* <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for cars"
            placeholder="Make, model, or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box> */}

        {/* Filters */}
        <FilterComponent onApplyFilters={handleApplyFilters} />

        {/* Car Grid */}
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
      </Box>
    </Box>
  );
};

export default SearchPage;
