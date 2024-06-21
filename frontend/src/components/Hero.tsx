import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import carBackground from '../assets/hero_car.jpeg'; // Import the image

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '80vh',
        backgroundImage: `url(${carBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 20px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Find Your Perfect Car
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover the best used cars tailored to your needs.
        </Typography>
        <Box
          sx={{
            backgroundColor: 'white',
            p: 3,
            borderRadius: '5px',
            marginTop: '20px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                variant="outlined"
                label="Search for cars"
                placeholder="Make, model, or keyword"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Sort By</InputLabel>
                <Select label="Sort By" defaultValue="">
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="mileage">Mileage</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
