import React from 'react'
import WebLayout from './WebLayout'
import MobileLayout from './MobileLayout'
import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

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
            <source src={'https://rr1---sn-nipoxcgv5qc5oq-ug8e.googlevideo.com/videoplayback?expire=1709490462&ei=vmzkZZSWC6fJzN0PnqKhoA4&ip=89.149.26.186&id=o-AC97Q-BDkDVirvtWvN2T3NZFXipf7FdxeCWKhXeTTRT4&itag=248&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&spc=UWF9f5uoJ68G24UZk1BJKW8lZVIyyF5_gzyWFl9M7coRSmM&vprv=1&svpuc=1&mime=video%2Fwebm&gir=yes&clen=93836847&dur=300.066&lmt=1685154434356464&keepalive=yes&fexp=24007246&c=ANDROID&txp=5316224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgW9vp60ck-FW4L_qDOty_fk9WBzhMiEHQlK6m2lhVecICIQDjHK6WvUpwd9sSaDVX5Ef8Q_neiIB7PjRPEqtoW0r18A%3D%3D&redirect_counter=1&rm=sn-q4felz7z&req_id=5935210cb692a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=ua&mip=103.83.246.84&mm=31&mn=sn-nipoxcgv5qc5oq-ug8e&ms=au&mt=1709471119&mv=m&mvi=1&pl=25&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=APTiJQcwRQIgeD4NzN49S4mJXn8L767DR9egk71YTUYQiDyKDJKIhDgCIQCFAHUpt1EqHzXrqMpALbq0EA5ry_4HEKQKgko4eP_rpw%3D%3D'} type="video/mp4" />
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