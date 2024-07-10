import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface FilterProps {
  onApplyFilters: (filters: any) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [state, setState] = useState<string>('');
  const [condition, setCondition] = useState<string>('');

  const handlePriceChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === 'number') {
      setMaxPrice(value);
    }
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };

  const handleApplyFilters = () => {
    console.log(maxPrice, state, condition);
    onApplyFilters({ maxPrice, state, condition });
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Price</InputLabel>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          aria-valuetext={`$${maxPrice}/hr`}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={10}
          marks
          min={10}
          max={200}
          value={maxPrice}
          onChange={handlePriceChange}
        />
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>State</InputLabel>
        <Select value={state} onChange={handleStateChange} label="State">
          {[
            'ak',
            'al',
            'ar',
            'az',
            'ca',
            'co',
            'ct',
            'dc',
            'de',
            'fl',
            'ga',
            'hi',
            'ia',
            'id',
            'il',
            'in',
            'ks',
            'ky',
            'la',
            'ma',
            'md',
            'me',
            'mi',
            'mn',
            'mo',
            'ms',
            'mt',
            'nc',
            'nd',
            'ne',
            'nh',
            'nj',
            'nm',
            'nv',
            'ny',
            'oh',
            'ok',
            'or',
            'pa',
            'ri',
            'sc',
            'sd',
            'tn',
            'tx',
            'ut',
            'va',
            'vt',
            'wa',
            'wi',
            'wv',
            'wy',
          ].map((state) => (
            <MenuItem key={state} value={state}>
              {state.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>Condition</InputLabel>
        <Select
          value={condition}
          onChange={handleConditionChange}
          label="Condition"
        >
          {['fair', 'good', 'excellent', 'like new', 'new'].map((condition) => (
            <MenuItem key={condition} value={condition}>
              {condition}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterComponent;
