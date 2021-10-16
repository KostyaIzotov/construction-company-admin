import React from 'react';

import {
  Box,
  Popover,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
} from '@mui/material';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import propStyles from '../../resources/propStyles';

const HeaderPopup = () => {
  return (
    <PopupState variant='popover' popupId='demo-popup-popover'>
      {(popupState) => (
        <div>
          <Box
            {...bindTrigger(popupState)}
            height={50}
            px={3}
            fontSize={20}
            fontWeight='bold'
            color={propStyles.greenColor}
            sx={{ ...propStyles.centerBlock }}
          >
            Профиль
          </Box>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List>
              <ListItem
                sx={{ width: 140, ...propStyles.centerBlock }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText sx={{ textAlign: 'center' }} primary='Выйти' />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default HeaderPopup;
