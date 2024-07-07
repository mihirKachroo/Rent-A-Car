import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ListingsList from '../components/OwnerListingList';
import ListingDetails from '../components/OwnerListing';
import CreateListingModal from '../components/CreateListingModal';
import { Listing } from '../types';
import {
  Container,
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from '@mui/material';

// interface Listing {
//   listing_id: string;
//   manufacturer: string;
//   model: string;
//   year: number;
//   description: string;
//   price: number;
//   condition: string;
//   paint_color: string;
//   mileage: number;
//   image_url: string;
// }

const OwnerMainPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/listings?owner_id=${user?.user_id}`
        );
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings', error);
      }
    };

    fetchListings();
  }, [user]);

  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCreateListing = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Refetch listings after closing the modal
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Typography variant="h4">My Listings</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateListing}
        >
          Create Listing
        </Button>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={() => setSelectedListing(null)}>
          Listings
        </Link>
        {selectedListing && (
          <Typography color="textPrimary">
            {selectedListing.manufacturer} {selectedListing.model}
          </Typography>
        )}
      </Breadcrumbs>
      <Box display="flex" mt={2}>
        <Box flex={1} mr={2}>
          <ListingsList
            listings={listings}
            onSelectListing={handleSelectListing}
          />
        </Box>
        <Box flex={2}>
          {selectedListing ? (
            <ListingDetails listing={selectedListing} />
          ) : (
            <Typography>Select a listing to see details</Typography>
          )}
        </Box>
      </Box>
      <CreateListingModal
        open={modalOpen}
        handleClose={handleCloseModal}
        ownerId={user!.user_id}
      />
    </Container>
  );
};

export default OwnerMainPage;
