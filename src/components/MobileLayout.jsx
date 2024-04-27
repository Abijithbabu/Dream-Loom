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
import { Favorite, Help, Home, Settings, ViewList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Img from '../assets/navBar.png'
import { useDispatch, useSelector } from 'react-redux';

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
      { icon: <IconButton sx={{ bgcolor: 'secondary.main' }}><Home /></IconButton>,id:`step-1`, path: '/home' },
      { icon: <IconButton sx={{ bgcolor: 'secondary.main' }}><Favorite /></IconButton>,id:`step-2`, path: '/favorites' },
      { icon: <StyledFab sx={{ borderColor: 'secondary.main', borderWidth: '33px' }}><AddIcon /></StyledFab>,id:`step-4`, path: '/create' },
      { icon: <IconButton sx={{ bgcolor: 'secondary.main' }}><ViewList /></IconButton>,id:`step-3`, path: '/library' },
      { icon: <IconButton sx={{ bgcolor: 'secondary.main' }}><Settings /></IconButton>,id:`step-6`, path: '/settings' },
   ];
   const [value, setValue] = React.useState(0);
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const payload = !useSelector(state=>state?.help)
   const toggleHelp = () =>{
      dispatch({ type: 'help', payload })
   }
   return (
      <React.Fragment>
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" >
               <Toolbar sx={{
                  backgroundImage: `url(${Img})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
               }}>
                  <IconButton onClick={toggleHelp} sx={{ marginLeft:'auto' }}><Help /></IconButton>
               </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, py: 3 }}>
               {children}
            </Box>
            <Paper
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'fixed',
                  bottom: 12,
                  left: 8,
                  right: 8,
                  p: 4,
                  backgroundColor: 'red',
                  borderRadius: '32px 32px 0 0', // Curved edges
                  background: 'linear-gradient(to top, transparent, #2e4054)',
                  boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // Shadow for a floating effect
               }}
               elevation={3}>
               <BottomNavigation
                  sx={{
                     position: 'fixed',
                     bottom: 16,
                     left: 8,
                     right: 8,
                     backgroundColor: 'primary.main',
                     borderRadius: '32px 32px 32px 32px', // Curved edges
                     background: 'linear-gradient(to bottom, transparent, #3D2D79 )',
                     boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // Shadow for a floating effect
                  }}
                  value={value}
                  onChange={(_event, newValue) => {
                     navigate(navItems[newValue]?.path);
                     setValue(newValue);
                  }}
               >
                  {navItems.map((x, index) => (
                     <BottomNavigationAction id={x.id} sx={{ borderRadius: '32px 32px 32px 32px', backgroundColor: 'transparent' }} key={index} label={x.name} icon={x.icon} />
                  ))}
               </BottomNavigation>
            </Paper>
         </Box>
      </React.Fragment>
   );
}
