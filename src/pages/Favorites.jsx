import { CircularProgress, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LibraryCard from '../components/LIbraryCard'


const Favorites = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const likes = useSelector(store => store?.likes) ?? []
    const { data, isLoading, error, fetchData } = useFetch('/story/')
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
                Favorites
            </Typography>
            <Container sx={{ backgroundColor: '#0000', margin: 0, overflowY: 'scroll' }}>
                <Typography variant="h" fontWeight="light" component="h3" sx={{ marginBottom: "20px" }}>Browse your liked stories</Typography>
                {isLoading ? <CircularProgress color="inherit" /> :
                   data?.map(x =>likes?.includes(x.id) && <LibraryCard key={x.id} data={x} handlePlay={()=>handlePlay(x)}/>)
                }
            </Container>
        </Container>
    )
}

export default Favorites