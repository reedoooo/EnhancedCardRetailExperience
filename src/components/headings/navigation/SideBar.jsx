import React from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  Hidden,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  Box,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuItemComponent from '../header/MenuItemComponent';
import { useAuthContext } from '../../../context/hooks/auth';
import getMenuItemsData from '../header/menuItemsData';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const SideBar = ({
  // dialog management
  isDialogOpen,
  openDialog,
  closeDialog,
  // login management
  isLoggedIn,
  handleLogout,
  // drawer management
  handleDrawer,
  isOpen,
  isMobileView,
  menuItemsData,
}) => {
  const classes = useStyles();

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Hidden smDown implementation="css">
      <SwipeableDrawer
        anchor="right" // Drawer opens from the right
        open={isOpen}
        onClose={handleDrawer}
        onOpen={handleDrawer} // Handle opening the drawer
        classes={{ paper: classes.drawerPaper }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        edge="right" // Optimize swiping from the right
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItemsData.map((item) => (
              <MenuItemComponent
                key={item.name}
                name={item.name}
                item={item}
                // toggles the drawer state
                onClick={() => handleDrawer()}
              />
            ))}
            <Divider />
            {isLoggedIn ? (
              <ListItem
                className={classes.listItem}
                onClick={() => {
                  handleDrawer();
                  handleLogout();
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem
                className={classes.listItem}
                onClick={() => {
                  handleDrawer();
                  openDialog();
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </SwipeableDrawer>
    </Hidden>
  );
};

export default SideBar;
