// menuItemsData.js

import React from 'react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import DeckBuilderIcon from '../layout/REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import { Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const baseMenuItems = ({ cartCardQuantity }) => [
  // {
  //   name: 'Menu',
  //   icon: <MenuIcon />,
  //   to: '/',
  //   requiresLogin: false,
  // },
  { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
  {
    name: 'Deck',
    icon: <DeckBuilderIcon color="black" />,
    to: '/deckbuilder',
    requiresLogin: false,
  },
  {
    name: 'Collection',
    icon: <CollectionIcon />,
    to: '/collection',
    requiresLogin: true,
  },
  {
    name: 'Store',
    icon: <StoreIcon />,
    to: '/store',
    requiresLogin: true,
  },
  {
    name: 'Cart',
    icon: (
      <Badge
        badgeContent={cartCardQuantity}
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiBadge-badge': {
            right: 3,
            padding: '0.25rem',
            marginLeft: 0.5,
            marginTop: 0.25,
          },
        }}
      >
        <CartIcon />
      </Badge>
    ),
    to: '/cart',
    requiresLogin: true,
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    to: '/profile',
    requiresLogin: false,
  },
];
