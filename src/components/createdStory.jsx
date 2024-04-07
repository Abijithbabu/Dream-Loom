import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { shorten } from '../helpers/shorten';

const CreateStory = ({ item, index }) => {
    const [title, desc] = shorten(item.story)
    return (
        <Box sx={{ overflow:'hidden'}}>
            <Box
                sx={{
                    backgroundImage: `linear-gradient(to bottom, transparent, #E30049), url(${item.backgroundImage })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%', // Adjusted width to fill the container
                    height: 250,
                    position: 'relative',
                    borderRadius: 3,
                    p: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginRight: '100px',
                }}
            >
                <Typography pb={3}></Typography>
                <IconButton aria-label="play/pause" sx={{ bgcolor: 'primary.main' }}>
                    <PlayArrowIcon sx={{ height: 25, width: 25 }} />
                </IconButton>
                <Typography pt={1} variant="h5">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" pt={1}>
                    {desc}
                </Typography>
            </Box>
        </Box>
    );
};

export default CreateStory;
