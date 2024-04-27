import { Backdrop, Box, Button, CircularProgress, Container, Grid, Paper, Typography, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Result from '../components/Result';
import { useSelector } from 'react-redux';
import parseQuestions from '../helpers/parseQuestions';
import Axios from '../helpers/axios';
import useCapture from '../hooks/useCapture';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));
const Mcq = () => {
  const data = useSelector((state) => state?.story)
  const user = useSelector((state) => state?.data?.user)
  const mcq = parseQuestions(data?.mcq)
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [ans, setAns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handleCapture, capturedImage] = useCapture(videoRef, canvasRef)
  const handleClick = (ans) => {
    handleCapture()
    if (!clicked) {
      setClicked(true)
      setAns(prev => {
        const arr = prev
        arr[question] = ans
        return [...arr]
      })
      if (ans === mcq[question]?.answer) {
        setScore(prev => prev + 1)
      }
    }
  }
  const color = (item) => {
    if (clicked) {
      if (item == mcq[question]?.answer) {
        return 'green'
      }
      return 'red'
    }
    return ''
  }
  const handleNext = () => {
    setClicked(false)
    if (question + 1 === 10) {
      createFeedback()
    }
    setQuestion(prev => prev + 1)
  }
  const checkFeedback = async () => {
    setIsLoading("Preparing Questionare...")
    await Axios.post(`/story/check`, { storyId: data.id, userId: user.id }).then(res => {
      if (res?.data) {
        setScore(res?.data?.score)
        setQuestion(10)
      }
      setIsLoading(false)
    }).catch((err) => console.log(err))
    setIsLoading(false)
  }

  useEffect(() => {
    checkFeedback()
  }, [])
  const createFeedback = async () => {
    const feedback = { storyId: data.id, userId: user.id, score, ans, image: capturedImage }
    const res = await Axios.post(`/story/feedback`, feedback).then(res => console.log(res)).catch(err => console.log('error:', err))
  }
  return (
    <Container sx={{ px: 3, py: 7 }}>
      {mcq?.map((x, index) => index === question && (
        <Box
          key={index}
          sx={{
            p: 2,
            minHeight: 500,
            borderRadius: 2,
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Typography>Questionare</Typography>
          <Grid container spacing={2} mb={8}>
            <Grid item xs={1}>
              Q.{index + 1}
            </Grid>
            <Grid item xs={11}>
              {x?.question}
            </Grid>
          </Grid>
          {x?.options?.map((item) => (
            <Item key={item} elevation={6} onClick={() => handleClick(item)} sx={{ backgroundColor: color(item) }}>
              {item}
            </Item>
          ))}
          <Button variant='contained' sx={{ ml: 'auto', mt: 'auto' }} disabled={!clicked} onClick={handleNext}>next</Button>
        </Box>
      ))}
      {question === 10 && <Result score={score} />}
      <div>
        <video ref={videoRef} style={{ display: 'none' }}></video>
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={() => { }}
      >
        <CircularProgress color="inherit" />&nbsp;&nbsp;{isLoading}
      </Backdrop>
    </Container>
  )
}

export default Mcq