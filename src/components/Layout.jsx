import React from 'react'
import WebLayout from './WebLayout'
import MobileLayout from './MobileLayout'
import { Hidden } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Hidden smDown>
                <WebLayout children={<Outlet />} />
            </Hidden>
            <Hidden smUp>
                <MobileLayout children={<Outlet />} />
            </Hidden>
        </>
    )
}

export default Layout