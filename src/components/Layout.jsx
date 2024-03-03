import React from 'react'
import WebLayout from './WebLayout'
import MobileLayout from './MobileLayout'
import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';
import bgVideo from "../assets/video1.mp4"

const Layout = () => {
   return (
      <>
         <video
            autoPlay
            loop
            muted
            style={{
               position: "absolute",
               width: "100%",
               height: "100%",
               objectFit: "cover",
               zIndex: -1,
            }}
         >
            <source src={bgVideo} type="video/mp4" />
         </video>
         <Hidden smDown>
            <WebLayout children={<Outlet />} />
         </Hidden>
         <Hidden smUp >
            <MobileLayout children={<Outlet />} />
         </Hidden>
      </>
   )
}

export default Layout