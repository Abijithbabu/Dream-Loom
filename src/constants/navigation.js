import { Add, Face, Favorite, GraphicEq, Home, ManageAccounts, ViewList } from "@mui/icons-material";

const navItems = [
   {
      name: 'Home',
      path: '/home',
      icon: <Home />
   },
   {
      name: 'Generate Story',
      path: '/create',
      icon: <Add />
   },
   {
      name: 'Library',
      path: '/library',
      icon: <ViewList />
   },
   {
      name: 'Favorites',
      path: '/favorites',
      icon: <Favorite />
   },
   {
      name: 'Face Recognition',
      path: '/face-recognition',
      icon: <Face />
   },
   {
      name: 'Voice Controls',
      path: '/voice-settings',
      icon: <GraphicEq />
   },
   {
      name: 'Users & Accounts',
      path: '/profile',
      icon: <ManageAccounts />
   },
]

export default navItems