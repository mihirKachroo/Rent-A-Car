import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Toolbar,
} from '@mui/material';
import rentalService from '../services/rentalService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Listing } from '../types';

const UserRentalsPage: React.FC = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRentals = async () => {
      if (!user) {
        setError('You need to be logged in to view your rentals.');
        setLoading(false);
        return;
      }

      try {
        const fetchedRentals = await rentalService.getUserRentals(user.userId);
        setRentals(fetchedRentals);
      } catch (err) {
        setError('Error fetching rentals');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRentals();
  }, [user]);

  const handleCardClick = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        My Previous Rentals
      </Typography>
      <Grid container spacing={3}>
        {rentals && rentals.length > 0 ? (
          rentals.map((rental) => (
            <Grid item xs={12} sm={6} md={4} key={rental.listing_id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => handleCardClick(rental.listing_id)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={rental.image_url || '/static/images/default-car.jpg'}
                  alt={`${rental.manufacturer} ${rental.model}`}
                />
                <CardContent>
                  <Typography variant="h6">
                    {rental.year} {rental.manufacturer} {rental.model}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Condition:</strong> {rental.condition}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Status:</strong> {rental.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Rented on:</strong>{' '}
                    {rental.rent_date
                      ? new Date(rental.rent_date).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Return by:</strong>{' '}
                    {rental.return_date
                      ? new Date(rental.return_date).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No rentals found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default UserRentalsPage;
