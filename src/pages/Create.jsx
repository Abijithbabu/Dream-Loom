import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AnimatedButton from '../components/btnStartNow';

export default function Create() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = React.useState('')
  const { data, isLoading, error, fetchData } = useFetch('/chat/test', { prompt }, 'POST')
  const handleChange = (e) => setPrompt(e.target.value)
  const handleSubmit = () => {
    if (prompt.length > 9) {
      fetchData()
    }
  }
  React.useEffect(() => {
    if (data) {
      navigate('/recite')
    }
  }, [data])
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          px: { xs: 5, sm: 0 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              fontSize: { xs: 51, md: 100 },
              fontWeight: 340,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Type your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Epic
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Unleash your creativity and craft incredible stories by sharing your thoughts with our story-telling app.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              rows={5}
              multiline
              variant="outlined"
              value={prompt}
              onChange={handleChange}
              aria-label="Enter your thoughts"
              placeholder="describe your thoughts"
              inputProps={{
                autocomplete: 'off',
                ariaLabel: 'Enter your thoughts',
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Start now
            </Button>
            {/* <AnimatedButton/> */}
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            Describe your story with atleast 10 characters
          </Typography>
        </Stack>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={() => { }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </Box>
  );
}