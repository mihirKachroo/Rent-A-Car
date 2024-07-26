import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Toolbar,
} from '@mui/material';
import listingService from '../services/listingService';

interface AveragePrice {
  condition: string;
  average_price: number;
}

const manufacturers = ['Ford', 'Toyota', 'Honda']; // Example manufacturers, replace with actual data or fetch from API

const AverageConditionPricePage: React.FC = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>(
    manufacturers[0]
  );
  const [data, setData] = useState<AveragePrice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAveragePrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response =
        await listingService.getAveragePriceByCondition(selectedManufacturer);
      setData(response);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAveragePrices();
  }, [selectedManufacturer]);

  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Average Price By Manufacturer
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          Manufacturer:
        </Typography>
        <Select
          value={selectedManufacturer}
          onChange={(e) => setSelectedManufacturer(e.target.value)}
          sx={{ mr: 2 }}
        >
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer} value={manufacturer}>
              {manufacturer}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAveragePrices}
        >
          Search
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Condition</TableCell>
              <TableCell>Average Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.condition}</TableCell>
                <TableCell>${item.average_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AverageConditionPricePage;
