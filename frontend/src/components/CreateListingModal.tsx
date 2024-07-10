import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';

interface CreateListingModalProps {
  open: boolean;
  handleClose: () => void;
  ownerId: string;
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({
  open,
  handleClose,
  ownerId,
}) => {
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    year: '',
    description: '',
    price: '',
    imageUrl: '',
    region: '',
    condition: '',
    rentTime: '',
    paintColor: '',
    stateId: '',
    mileage: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };
  const handleSubmit = async () => {
    const newListing = {
      ...formData,
      owner_id: ownerId,
      posting_date: new Date().toISOString(),
      status: 'active',
    };
    try {
      await axios.post('http://localhost:3000/listings', newListing);
      handleClose();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Listing</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <TextField
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <TextField
            label="Region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel>Condition</InputLabel>
            <Select
              name="condition"
              value={formData.condition}
              onChange={handleSelectChange}
            >
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="like new">Like New</MenuItem>
              <MenuItem value="new">New</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Rent Time (days)"
            name="rent_time"
            type="number"
            value={formData.rentTime}
            onChange={handleChange}
          />
          <TextField
            label="Paint Color"
            name="paint_color"
            value={formData.paintColor}
            onChange={handleChange}
          />
          <TextField
            label="State ID"
            name="state_id"
            value={formData.stateId}
            onChange={handleChange}
          />
          <TextField
            label="Mileage"
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateListingModal;
