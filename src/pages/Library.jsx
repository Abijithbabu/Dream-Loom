import { CircularProgress, Container, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LibraryCard from '../components/LIbraryCard'


const Library = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(store=>store?.data?.user?.id)
    const { data, isLoading, error, fetchData } = useFetch(`/user/stories/${userId}`)
    useEffect(() => {
        fetchData()
    }, [])

    const handlePlay = (story) => {
        dispatch({ type: 'story', payload: {...story,author:{id:userId}} })
        navigate('/recite')
    }
    return (
        <Container sx={{ overflowX: 'scroll', width: "80vw", py: 5 }} boxShadow={3}>
            <Typography variant='h4' sx={{ paddingBottom: '10px' }} fontWeight={700}>
                Library
            </Typography>
            <Container sx={{ height: '75vh', margin: 0, overflowY: 'scroll' }}>
                <Typography variant="h" fontWeight="light" component="h3" sx={{ marginBottom: "20px" }}>Browse your creations</Typography>
                {isLoading ? <CircularProgress color="inherit" /> :
                    data?.data?.stories?.map(x => <LibraryCard data={x} key={x.id} handlePlay={()=>handlePlay(x)}/>)
                }
            </Container>
        </Container>
    )
}

export default Library