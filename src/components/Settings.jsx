import * as React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { ChevronRight, Face, GraphicEq, Logout, ManageAccounts } from '@mui/icons-material';
import { Container, IconButton, ListItemButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
   const [checked, setChecked] = React.useState(['wifi']);
   const navigate = useNavigate()
   const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
   const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
         newChecked.push(value);
      } else {
         newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked); 
   };
   React.useEffect(() => {
      if (sm) navigate('/face-recognition')
   }, [sm, navigate])

   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
            borderRadius:'10px'
            
         }}>
         <List
            sx={{ width: '100%', maxWidth: 360,  backdropFilter: "blur(15px)",borderRadius:'15px'}}
            subheader={<ListSubheader sx={{backgroundColor:'primary.main'}}> Settings</ListSubheader>}
         >
            <ListItemButton onClick={() => navigate('/face-recognition')}>
               <ListItemIcon>
                  <Face />
               </ListItemIcon>
               <ListItemText id="switch-list-label-wifi" primary="Face Recognition" />
               <Switch
                  edge="end"
                  onChange={handleToggle('wifi')}
                  checked={checked.indexOf('wifi') !== -1}
                  inputProps={{
                     'aria-labelledby': 'switch-list-label-wifi',
                  }}
               />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/voice-settings')}>
               <ListItemIcon>
                  <GraphicEq />
               </ListItemIcon>
               <ListItemText id="switch-list-label-bluetooth" primary="Voice Controls" />
               <Switch
                  edge="end"
                  onChange={handleToggle('bluetooth')}
                  checked={checked.indexOf('bluetooth') !== -1}
                  inputProps={{
                     'aria-labelledby': 'switch-list-label-bluetooth',
                  }}
               />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/profile')}
               secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                     <ChevronRight />
                  </IconButton>
               }
            >
               <ListItemIcon>
                  <ManageAccounts />
               </ListItemIcon>
               <ListItemText id="switch-list-label-bluetooth" primary="Manage Accounts" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/login')}>
               <ListItemIcon>
                  <Logout />
               </ListItemIcon>
               <ListItemText id="switch-list-label-bluetooth" primary="Logout" />
            </ListItemButton>
         </List>
      </Container>
   );
}