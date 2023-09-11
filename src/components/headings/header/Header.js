import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth/authContext';
import logo from '../../../assets/navlogo.png';
import './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import MenuItems from '../navigation/MenuItems';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import SimpleCart from '../../SimpleCart/index';

const HeaderWrapper = styled(AppBar)`
  background-color: #333;
  color: #fff;
  padding: 1rem;

  .menuIcon {
    color: #fff;
  }

  .linkToHome {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .navLogo {
    height: 3em;
    margin-left: 1em;
  }
`;

const ToolbarWrapper = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    .desktopMenuItems {
      display: none;
    }
    .mobileMenuIcon {
      display: block; // Make sure this is here
    }
  }

  @media (min-width: 769px) {
    .mobileMenuIcon {
      display: none;
    }

    .desktopMenuItems {
      display: flex;
    }
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleDrawerOpen = () => setIsOpen(true);
  const handleDrawerClose = () => setIsOpen(false);

  return (
    <HeaderWrapper position="static">
      <ToolbarWrapper>
        <div>
          {/* Add the IconButton here */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className="menuIcon mobileMenuIcon"
          >
            <MenuIcon />
          </IconButton>
          <div className="desktopLogo">
            {/* Move the logo rendering here */}
            <Typography variant="h6">
              <Link to="/home" className="linkToHome">
                <img src={logo} className="navLogo" alt="Logo" />
              </Link>
            </Typography>
          </div>
        </div>
        <div>
          <Drawer anchor="right" open={isOpen} onClose={handleDrawerClose}>
            <div className="mobileLogo">
              {/* Display the logo at the top of the drawer */}
              <Typography variant="h6">
                <Link to="/home" className="linkToHome">
                  <img src={logo} className="navLogo" alt="Logo" />
                </Link>
              </Typography>
            </div>
            <MenuItems
              isLoggedIn={isLoggedIn}
              logout={logout}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
          <div className="desktopMenuItems">
            <MenuItems
              isLoggedIn={isLoggedIn}
              logout={logout}
              handleDrawerClose={handleDrawerClose}
            />
          </div>
        </div>
      </ToolbarWrapper>
    </HeaderWrapper>
  );
}

export default Header;
