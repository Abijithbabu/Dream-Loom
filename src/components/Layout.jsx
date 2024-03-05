import React from 'react'
import WebLayout from './WebLayout'
import MobileLayout from './MobileLayout'
import { Container, Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';
import bgVideo from "../assets/video2.mp4"
import Img from '../assets/bg2.png'
const Layout = () => { 
   return (
      <Container sx={{
               backgroundImage: `url(${Img})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               position: "absolute",
               width: "100%",
               height: "100%",
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