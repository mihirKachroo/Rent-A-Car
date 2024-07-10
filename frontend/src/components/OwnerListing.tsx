import React from 'react';
import { Typography, Box } from '@mui/material';
import { Listing } from '../types';

interface ListingDetailsProps {
  listing: Listing;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listing }) => {
  return (
    <Box p={2}>
      <Typography variant="h4">
        {listing.manufacturer} {listing.model} ({listing.year})
      </Typography>
      <Typography variant="body1">{listing.description}</Typography>
      <Typography variant="h6">Price: ${listing.price}</Typography>
      <Typography variant="h6">Condition: {listing.condition}</Typography>
      <Typography variant="h6">Paint Color: {listing.paintColor}</Typography>
      <Typography variant="h6">Mileage: {listing.mileage} miles</Typography>
      <Box
        component="img"
        src={listing.imageUrl}
        alt={`${listing.manufacturer} ${listing.model}`}
        sx={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
};

export default ListingDetails;
