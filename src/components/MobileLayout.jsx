import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import { Favorite, Home, Settings, ViewList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledFab = styled(Fab)({
   position: 'absolute',
   zIndex: 1,
   top: -15,
   left: 0,
   right: 0,
   margin: '0 auto',
});

export default function BottomAppBar({ children }) {
   const navItems = [
      { icon: <Home />, name: 'Home', path: '/home' },
      { icon: <Favorite />, name: 'Favorites', path: '/favorites' },
      { icon: <StyledFab><AddIcon /></StyledFab>, name: '', path: '/create' },
      { icon: <ViewList />, name: 'Library', path: '/library' },
      { icon: <Settings />, name: 'Settings', path: '/settings' },
   ];
   const [value, setValue] = React.useState(0);
   const navigate = useNavigate();
   return (
      <React.Fragment>
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" >
               <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                     DreamLoom
                  </Typography>
               </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, py: 3 }}>
               {children}
            </Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
               <BottomNavigation
                  value={value}
                  onChange={(_event, newValue) => {
                     navigate(navItems[newValue]?.path)
                     setValue(newValue);
                  }}
               >
                  {navItems.map(x => <BottomNavigationAction label={x.name} icon={x.icon} />)}
               </BottomNavigation>
            </Paper>
         </Box>
      </React.Fragment>
   );
}
