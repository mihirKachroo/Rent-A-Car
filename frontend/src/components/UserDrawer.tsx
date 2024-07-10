import React, { useState } from 'react';
import { Theme, SxProps, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';

interface UserDrawerProps {
  sx?: SxProps<Theme>;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ sx }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useAuth();

  const handleAvatarClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem>
          <ListItemText primary="First Name" secondary={user?.firstName} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Last Name" secondary={user?.lastName} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Email" secondary={user?.email} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Date of Birth"
            secondary={
              user?.dateOfBirth instanceof Date
                ? user.dateOfBirth.toLocaleDateString()
                : ''
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Password" secondary="********" />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', ...sx }}>
      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          sx={{
            width: isCollapsed ? 70 : 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isCollapsed ? 70 : 240,
              boxSizing: 'border-box',
              top: '64px', // Adjust based on AppBar height
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0',
              cursor: 'pointer',
            }}
            onClick={handleAvatarClick}
          >
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </Box>
          <Collapse in={!isCollapsed}>{drawerContent}</Collapse>
        </Drawer>
      )}
    </Box>
  );
};

export default UserDrawer;
