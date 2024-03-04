import * as React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { ChevronRight, Face, GraphicEq, Logout, ManageAccounts } from '@mui/icons-material';
import { Container, IconButton, ListItem, ListItemButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings() {
   const detectface = useSelector(state => state?.faceRecognition)
   const [checked, setChecked] = React.useState(detectface ?? true);
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
   const handleToggle = (event) => {
      setChecked(event.target.checked);
      dispatch({ type: 'face_recognition', payload: event.target.checked })
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
            pt: 13,
            borderRadius: '10px'
         }}>
         <List
            sx={{ width: '100%', maxWidth: 400, backdropFilter: "blur(15px)", borderRadius: '15px', borderStyle: 'double' }}
            subheader={<ListSubheader sx={{ backgroundColor: 'primary.main' }}> Settings</ListSubheader>}
         >
            <ListItem>
               <ListItemButton onClick={() => checked && navigate('/face-recognition')}>
                  <ListItemIcon>
                     <Face />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-emotion" primary="Face Recognition" />
               </ListItemButton>
               <Switch
                  edge="end"
                  checked={checked}
                  onChange={handleToggle}
                  inputProps={{
                     'aria-labelledby': 'switch-list-label',
                  }}
               />
            </ListItem>
            <ListItem onClick={() => navigate('/voice-settings')}>
               <ListItemButton >
                  <ListItemIcon>
                     <GraphicEq />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-voice" primary="Voice Controls" />
               </ListItemButton>
               <IconButton aria-label="comments">
                  <ChevronRight />
               </IconButton>
            </ListItem>
            <ListItem onClick={() => navigate('/profile')}>
               <ListItemButton>
                  <ListItemIcon>
                     <ManageAccounts />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-profile" primary="Manage Accounts" />
               </ListItemButton>
               <IconButton aria-label="comments">
                  <ChevronRight />
               </IconButton>
            </ListItem>
            <ListItem onClick={() => navigate('/login')}>
               <ListItemButton>
                  <ListItemIcon>
                     <Logout />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-logout" primary="Logout" />
               </ListItemButton>
               <IconButton aria-label="comments">
                  <ChevronRight />
               </IconButton>
            </ListItem>
         </List>
      </Container>
   );
}