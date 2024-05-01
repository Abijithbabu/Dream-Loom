import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Routes from './routes/Routes';
import './App.css';
import Joyride from "react-joyride";
import { steps } from './constants/steps';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function App() {
  const help = useSelector(state => state?.help)
  const navigate = useNavigate()
  const handleSteps = e => {
    if (e?.index === 5) navigate('/create')
  }
  return (
    <ThemeProvider theme={theme}>
      <Joyride
        continuous
        callback={handleSteps}
        run={help ?? false}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
      />
      <Routes />
    </ThemeProvider>
  );
}