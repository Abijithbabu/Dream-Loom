import { Outlet, useLocation } from "react-router-dom";
import {
   Box,
   Grid,
   Typography,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import bgVideo from "../assets/video1.mp4"
import Img from '../assets/bg.jpeg'

const AuthLayout = () => {

   // Access the current pathname
   const { pathname } = useLocation();
   const formattedPathname = pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2)

   // Access breakpoints from MUI theme
   const { breakpoints } = useTheme();
   const lg = useMediaQuery(breakpoints.down("lg"));
   const md = useMediaQuery(breakpoints.down("md"));
   const sm = useMediaQuery(breakpoints.down("sm"));

   return (
      <>
         <div
            style={{
               backgroundImage: `url(${Img})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               position: "absolute",
               width: "100%",
               minHeight: "100vh",
               objectFit: "cover",
               zIndex: -1,
               color: "#f5f5f5",
            }}
         >
            {/* <video
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
            </video> */}

            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  right: "50%",
                  transform: "translate(-50%,-50%)",
                  width: lg ? (md ? (sm ? "90%" : "75%") : "50%") : "35%",
                  height: "65%",
                  background: "rgba(0,0,0,0.7)",
                  boxShadow: 24,
               }}
            >
               <Grid container>
                  <Grid item xs={12} sm={12} lg={12}>
                     <Box
                        sx={{
                           backgroundSize: "cover",
                           height: "50vh",
                           minHeight: "500px",
                        }}
                     >
                        <Box height={35} />
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                           <Box>
                              <Typography component="h1" variant="h4">
                                 {formattedPathname === 'Set-child-profile' ? "Set Child Profile" : formattedPathname}
                              </Typography>
                           </Box>
                        </Box>
                        <Box height={35} />
                        <Outlet/>
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </div>
      </>
   );
};

export default AuthLayout;