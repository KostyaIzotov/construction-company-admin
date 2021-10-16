import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import propStyles from '../../resources/propStyles';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerListItem = ({ isOpenDrawer, label, path, icon }) => {
  const history = useHistory();
  const location = useLocation();
  const locCheck = location.pathname === path;

  const pushToPage = () => {
    history.push(path);
  };

  return (
    <Box
      onClick={() => pushToPage(path)}
      px={2}
      py={2}
      sx={{
        display: 'flex',
        justifyContent: !isOpenDrawer ? 'center' : 'space-between',
        alignItems: 'center',
        borderBottomRightRadius: !isOpenDrawer ? 0 : 40,
        bgcolor:
          isOpenDrawer && locCheck
            ? propStyles.greenColor
            : !isOpenDrawer && locCheck
            ? propStyles.greenColor
            : null,
        color:
          isOpenDrawer && locCheck
            ? '#fff'
            : !isOpenDrawer && locCheck
            ? '#fff'
            : propStyles.inputLabelColor,
        transition: 'all ease-in-out 0.4s',
        '&:hover': {
          bgcolor:
            isOpenDrawer && locCheck
              ? propStyles.greenColor
              : !isOpenDrawer && locCheck
              ? propStyles.greenColor
              : isOpenDrawer && !locCheck
              ? null
              : propStyles.greenColor,
          color:
            isOpenDrawer && locCheck
              ? '#fff'
              : !isOpenDrawer && locCheck
              ? '#fff'
              : isOpenDrawer && !locCheck
              ? propStyles.greenColor
              : '#fff',

          transition: 'all ease-in-out 0.4s',
          borderBottomRightRadius: !isOpenDrawer && !locCheck ? 40 : 0,
        },
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          fontSize={28}
          pr={isOpenDrawer ? 2 : 0}
          sx={{ ...propStyles.centerBlock }}
        >
          {icon}
        </Box>
        {isOpenDrawer && (
          <Typography
            sx={{ ...propStyles.centerBlock, justifyContent: 'flex-start' }}
            component='div'
            width='100px'
            fontWeight='500'
          >
            {label}
          </Typography>
        )}
      </Box>
      {isOpenDrawer && (
        <Box>
          <ChevronRightIcon />
        </Box>
      )}
    </Box>
  );
};

export default DrawerListItem;
