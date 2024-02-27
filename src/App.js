import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HashRouter } from "react-router-dom";
import Routes from './routes/Routes';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </ThemeProvider>
  );
}