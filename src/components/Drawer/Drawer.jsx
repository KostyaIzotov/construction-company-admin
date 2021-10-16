import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

import DrawerHeader from './DrawerHeader';
import DrawerListItem from './DrawerListItem';

import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRightWidth: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderRightWidth: 0,

  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  borderRightWidth: 0,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerLayout = ({ isOpenDrawer }) => {
  return (
    <Drawer variant='permanent' open={isOpenDrawer}>
      <DrawerHeader />
      <Box my={3}>
        <DrawerListItem
          path='/'
          isOpenDrawer={isOpenDrawer}
          label='Главная'
          icon={<HomeWorkIcon />}
        />
        <DrawerListItem
          label='Работники'
          path='/workers'
          isOpenDrawer={isOpenDrawer}
          icon={<EmojiPeopleIcon />}
        />
        <DrawerListItem
          label='Инструменты'
          path='/instruments'
          isOpenDrawer={isOpenDrawer}
          icon={<WorkOutlineIcon />}
        />
      </Box>
    </Drawer>
  );
};

export default DrawerLayout;
