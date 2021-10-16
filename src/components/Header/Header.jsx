import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';

import { styled } from '@mui/material/styles';
import { Box, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import MuiAppBar from '@mui/material/AppBar';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import propStyles from '../../resources/propStyles';

import HeaderPopup from '../HeaderPopup';
import HeaderCompanyLogo from '../Elements/HeaderCompanyLogo';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({ isOpenDrawer, toggleShowLayout }) => {
  const classes = useStyles();
  let location = useLocation();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    getExistPageName();
    // eslint-disable-next-line
  }, [location]);

  const getExistPageName = () => {
    const { pathname: path } = location;
    if (path === '/') {
      setPageName('Главная');
    } else if (path === '/instruments') {
      setPageName('Инструменты');
    } else if (path === '/employees') {
      setPageName('Работники');
    }
  };

  const handleDrawerOpen = () => {
    toggleShowLayout(true);
  };

  const handleDrawerClose = () => {
    toggleShowLayout(false);
  };

  return (
    <AppBar
      sx={{ bgcolor: '#fff', boxShadow: 0 }}
      position='fixed'
      open={isOpenDrawer}
    >
      <Toolbar style={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            width={isOpenDrawer ? drawerWidth : 73}
          >
            {!isOpenDrawer ? (
              <Box>
                <HeaderCompanyLogo />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <HeaderCompanyLogo />
                </Box>
                <Typography
                  variant='h1'
                  ml={2}
                  fontWeight='bolder'
                  fontSize={24}
                  color={propStyles.greenColor}
                >
                  COMPANY
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              ml: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            {isOpenDrawer ? (
              <Box>
                <MenuIcon
                  onClick={handleDrawerClose}
                  className={classes.menuIcon}
                />
              </Box>
            ) : (
              <ArrowRightAltIcon
                onClick={handleDrawerOpen}
                className={classes.menuIcon}
              />
            )}
          </Box>
          <Typography
            ml={1}
            color={propStyles.inputLabelColor}
            fontSize={28}
            fontWeight='600'
          >
            {pageName}
          </Typography>
        </Box>
        <Box
          sx={{
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'rgba(54, 201, 95, 0.05)',
            borderRadius: 100,
            userSelect: 'none',
            cursor: 'pointer',
          }}
          mr={3}
          ml='auto'
        >
          <HeaderPopup />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  menuIcon: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 50,
    },
    color: propStyles.greenColor,
    fontSize: 30,
    cursor: 'pointer',
    padding: 5,
  },
  profileImg: {
    width: 50,
    height: 50,
    // border: `0.4px solid ${propStyles.greenColor}`,
    borderRadius: 50,
  },
});

const mapDispatch = ({ layout }) => ({
  toggleShowLayout: (bool) => layout.toggleShowLayout(bool),
});

export default connect(null, mapDispatch)(Header);
