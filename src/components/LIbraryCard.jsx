import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { shorten } from '../helpers/shorten';
import LikeButton from './LikeButton';

export default function LibraryCard({ handlePlay, data }) {
  const [title, desc] = shorten(data?.story)
  return (
    <Box sx={{ minWidth: 215, py: 2, width: '100%'}}>
      <Card variant="outlined" sx={{ backgroundImage: `linear-gradient(to bottom, transparent, #E30049), url('/')`}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {new Date(data?.createdAt).toDateString()}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {desc}
          </Typography>
        </CardContent>
        <CardActions >
          <Button size="small" onClick={handlePlay}>Read More</Button>
          <LikeButton storyId={data?.id}/>
        </CardActions>
      </Card>
    </Box>
  );
}
