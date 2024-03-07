import { CircularProgress, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AutoPlay from '../components/Corousal'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading, error, fetchData } = useFetch('/chat/')
  useEffect(() => {
    fetchData()
  }, [])

  const handlePlay = (story) => {
    dispatch({ type: 'story', payload: story })
    navigate('/recite')
  }
  return (
    <Container sx={{ overflowX: 'scroll', width: "80vw", py: 5 }} boxShadow={3}>
      <Typography variant='h4' sx={{ paddingBottom: '10px' }} fontWeight={700}>
        Welcome User
      </Typography>
      <Container sx={{ backgroundColor: '#0000', margin: 0 }}>
        <Typography variant="h" fontWeight="light" component="h3" sx={{ marginBottom: "20px" }}>Recommed for you</Typography>
        {isLoading ? <CircularProgress color="inherit" /> :
          <AutoPlay data={data} handlePlay={handlePlay} />
        }
        <Typography variant="h" fontWeight="light" component="h3" sx={{ marginTop: "10px" }}>Explore</Typography>
        {isLoading ? <CircularProgress color="inherit" /> :
          <AutoPlay data={data} handlePlay={handlePlay} />
        }
      </Container>
    </Container>
  )
}

export default Home