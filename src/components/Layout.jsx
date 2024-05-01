import React from 'react'
import WebLayout from './WebLayout'
import MobileLayout from './MobileLayout'
import { Container, Hidden } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Img1 from '../assets/bg5.jpg'
import Img2 from '../assets/bg3.jpg'
import Img3 from '../assets/bg4.jpg'
import Img4 from '../assets/bg1.jpg'
import Img5 from '../assets/bg.jpeg'
const Layout = () => { 
   const path = useLocation().pathname
   const image = path === '/' ? Img1 : path === '/home' ? Img1 : path === '/favorites' ? Img2 : path === '/create' ? Img3 : path === '/library' ? Img4 : Img5
   return (
      <Container sx={{
               backgroundImage: `url(${image})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               position: "absolute",
               width: "100%",
               minHeight: "100vh",
               objectFit: "cover",
               zIndex: -1,
            }}>
         <Hidden smDown>
            <WebLayout children={<Outlet />} />
         </Hidden>
         <Hidden smUp >
            <MobileLayout children={<Outlet />} />
         </Hidden>
      </Container>
   )
}

export default Layout