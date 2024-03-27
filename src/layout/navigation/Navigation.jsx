import React, { useState, useEffect, useCallback } from 'react';
import {
  Toolbar,
  IconButton,
  List,
  Hidden,
  ListItem,
  ListItemText,
  AppBar,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useCartStore, useMode } from '../../context';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, useSprings } from 'react-spring';
import RCLogoSection from '../REUSABLE_COMPONENTS/RCLOGOSECTION/RCLogoSection';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Radio,
  Sheet,
  Typography,
} from '@mui/joy';
import { useCookies } from 'react-cookie';
import { baseMenuItems } from '../../data/baseMenuItems';
const Navigation = ({ isLoggedIn }) => {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { totalQuantity } = useCartStore();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isOpen, setIsOpen] = useState(false); // Manage open state locally
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const iconColor = isMobileView ? theme.palette.primary.main : 'white';
  const [cookies] = useCookies('authUser');
  const username = cookies?.authUser?.username;
  const menuItems = baseMenuItems({ cartCardQuantity: totalQuantity });
  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const [springs] = useSprings(menuItems.length, (index) => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: index * 100,
  }));

  const ContentContainer = ({ type, content, clickAction, itemIndex }) => {
    const handleClick = () => {
      if (clickAction === 'navigate' && itemIndex !== undefined) {
        navigate(menuItems[itemIndex].to);
      } else {
        toggleSidebar();
      }
    };
    return (
      <Card
        sx={{
          py: type === 'top' ? theme.spacing(4) : theme.spacing(2),
          px: 'auto',

          flexGrow: 1,
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          maxWidth: clickAction === 'navigate' ? '100%' : '5rem',
          boxShadow: 'none',
          border: '3px solid',
          borderColor: theme.palette.chartTheme.greenAccent.light,
          '&:hover': { bgcolor: 'background.level1' },
        }}
        onClick={handleClick}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content}
        </CardContent>
      </Card>
    );
  };

  const renderMenuItems = (type) => {
    return springs.map((style, index) => (
      <animated.div style={style} key={`${menuItems[index]?.name}`}>
        <ListItem
          sx={{
            maxHeight: 64,
            maxWidth: '100%',
            '&:hover': { backgroundColor: theme.palette.backgroundF.light },
          }}
        >
          <ContentContainer
            type={type}
            content={
              <>
                {menuItems[index]?.icon}
                <Typography level="title-md" sx={{ ml: 1 }}>
                  {menuItems[index]?.name}
                </Typography>
              </>
            }
            itemIndex={index}
            clickAction="navigate"
          />
        </ListItem>
      </animated.div>
    ));
  };
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          maxHeight: 64,
          minWidth: '100vw',
          background: '#141414',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <ContentContainer
              type="top"
              content={
                <IconButton
                  variant="outlined"
                  color="white"
                  onClick={toggleSidebar}
                  size="small"
                  edge="start"
                  aria-label="menu"
                  sx={{
                    justifyContent: 'center',
                    px: 'auto',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              }
              clickAction={'toggle'}
              index={0}
            />
            <RCLogoSection />
          </Box>
          {!isMobileView && renderMenuItems('top')}
          <Card
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              background: 'white',
              flexDirection: 'row',
            }}
          >
            <Avatar variant="soft" sx={{ mr: 1 }} />
            <Typography level="title-md">{username}</Typography>
          </Card>
        </Toolbar>
      </AppBar>
      {/* <Hidden smDown implementation="css"> */}
      <Drawer
        // size="xs"
        size="sm"
        variant="plain"
        open={isOpen}
        onClose={toggleSidebar}
        // ! ModalProps={{ keepMounted: true }}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
        sx={{
          // borderRadius: 'md',
          // p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          // gap: 2,
          // height: '100%',
          // overflow: 'auto',
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: '1rem' }} />
          <List>{renderMenuItems('side')}</List>
        </Sheet>
      </Drawer>
      {/* </Hidden> */}
    </>
  );
};

export default Navigation;