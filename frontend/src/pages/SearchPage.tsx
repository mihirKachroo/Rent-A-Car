import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
} from '@mui/material';

const SearchPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>('');

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOption(event.target.value as string);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Drawer for User Information */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            top: '64px', // Adjust based on AppBar height
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary="John" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Last Name" secondary="Doe" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email" secondary="john.doe@example.com" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Date of Birth" secondary="01/01/2000" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Password" secondary="********" />
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
        {/* Search Bar */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for cars"
            placeholder="Make, model, or keyword"
          />
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Brand</InputLabel>
            <Select label="Brand" defaultValue="">
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Honda">Honda</MenuItem>
              <MenuItem value="Ford">Ford</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Year</InputLabel>
            <Select label="Year" defaultValue="">
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Color</InputLabel>
            <Select label="Color" defaultValue="">
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Apply Filters
          </Button>
        </Box>

        {/* Sorting Options */}
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="mileage">Mileage</MenuItem>
              <MenuItem value="posting_date">Posting Date</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Change Sorting Option
          </Button>
        </Box>

        {/* Car Grid */}
        <Grid container spacing={2}>
          {Array.from(new Array(12)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6">Car {index + 1}</Typography>
                <Typography variant="body2">Brand: Example</Typography>
                <Typography variant="body2">Year: 2020</Typography>
                <Typography variant="body2">Color: Red</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;
