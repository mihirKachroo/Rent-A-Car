import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Listing } from '../types';

interface ListingsListProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
}

const ListingsList: React.FC<ListingsListProps> = ({
  listings,
  onSelectListing,
}) => {
  return (
    <div>
      <Typography variant="h6">My Listings</Typography>
      <List>
        {listings.map((listing) => (
          <ListItem
            button
            key={listing.listingId}
            onClick={() => onSelectListing(listing)}
          >
            <ListItemText
              primary={`${listing.manufacturer} ${listing.model} (${listing.year})`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListingsList;
