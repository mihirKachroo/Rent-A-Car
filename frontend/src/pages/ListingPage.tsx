import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Toolbar,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import listingService from '../services/listingService';
import { Listing } from '../types';
import rentalService from 'services/rentalService';

const ListingPage: React.FC = () => {
  const { user } = useAuth();
  const { listingId } = useParams<{ listingId: string }>();
  const [listing, setListing] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { listing, reviews } = await listingService.getListingById(
          listingId!
        );

        console.log(listing);
        console.log(reviews);
        setListing(listing);
        setReviews(reviews);
      } catch (error) {
        setError('Error fetching listing details');
      }
    };

    fetchListing();
  }, [listingId]);

  const handleRent = async () => {
    if (!user) {
      setMessage('You must have an account to rent.');
      return;
    }

    try {
      // Uncomment and implement rental logic when available
      await rentalService.rentListing(user.userId, listingId!);
      setMessage('Successfully rented the listing!');
    } catch (error) {
      setError('Error renting the listing');
    }
  };

  if (!listing) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        {listing.year} {listing.manufacturer} {listing.model}
      </Typography>
      {message && <Alert severity="info">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>${listing.price}/day</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mileage</TableCell>
              <TableCell>
                {listing.mileage ? listing.mileage.toLocaleString() : 'N/A'} km
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Region</TableCell>
              <TableCell>{listing.region}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>{listing.condition}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      {reviews && reviews.length > 0 ? (
        <List>
          {reviews.map((review: any, index: React.Key) => (
            <ListItem key={index}>
              <ListItemText
                primary={review.author}
                secondary={review.comments}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No reviews available.</Typography>
      )}

      <Button variant="contained" color="primary" onClick={handleRent}>
        Rent
      </Button>
    </Box>
  );
};

export default ListingPage;
