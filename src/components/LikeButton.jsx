import React from 'react'
import { IconButton } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'

const LikeButton = ({ storyId }) => {
    const likes = useSelector(store => store?.likes) ?? []
    const liked = likes?.includes(storyId)
    const dispatch = useDispatch()
    const handleLike = () => {
        const arr = liked ? likes.filter(item => item !== storyId) : [...likes,storyId]
        dispatch({ type: 'likes', payload: arr })
    }

    return (
        <IconButton onClick={handleLike} >
           {liked ? <Favorite /> : <FavoriteBorder/>}
        </IconButton>
    )
}

export default LikeButton