import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Listing } from '../types';
import { useAuth } from '../context/AuthContext';
import { useFavourites } from '../context/FavouriteContext';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [expanded, setExpanded] = React.useState(false);
  const { user } = useAuth();
  const { favouriteIds, addFavourite, removeFavourite } = useFavourites();

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isFavourite = favouriteIds.includes(listing.listingId);

  const handleToggleFavourite = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      if (isFavourite) {
        await removeFavourite(user.userId, listing.listingId);
      } else {
        await addFavourite(user.userId, listing);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        onClick={() => navigate(`/listing/${listing.listingId}`)}
        title={`${listing.year} ${listing.manufacturer} ${listing.model}`}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={listing.imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Price:</strong> ${listing.price}/day
          <br />
          <strong>Mileage:</strong> {listing.mileage.toLocaleString()} km
          <br />
          <strong>Region:</strong> {listing.region}
          <br />
          <strong>Condition:</strong> {listing.condition}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleToggleFavourite}
        >
          <FavoriteIcon style={{ color: isFavourite ? red[500] : 'inherit' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ListingCard;
