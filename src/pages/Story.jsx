import React, { useEffect, useRef, useState } from 'react'
import { Backdrop, Box, Button, ButtonGroup, CircularProgress, Container, IconButton, alpha } from '@mui/material'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { useDispatch, useSelector } from 'react-redux'
import { ReactTyped } from 'react-typed'
import splitIntoParagraphs from '../helpers/splitIntoPara'
import { Pause, PlayArrow } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Axios from '../helpers/axios'

const Story = () => {
   const data = useSelector((state) => state?.story)
   const user = useSelector((state) => state?.data?.user)
   const dispatch = useDispatch()
   const [isLoading, setIsLoading] = useState(false)
   const [started, setStarted] = useState(false)
   const [typed, setTyped] = React.useState()
   const [handlePlay, isPaused, handlePause] = useTextToSpeech(data?.story)
   const navigate = useNavigate()
   function start() {
      try {
         if (!started) {
            setStarted(true)
            handlePlay()
            typed.toggle()
            return
         }
         isPaused ? handlePlay() : handlePause()
         typed.toggle()
      } catch (error) {
         console.error(error)
      }
   }
   const containerRef = useRef(null);

   useEffect(() => {
      const interval = setInterval(() => {
         containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }, 1000);
      return () => {
         clearInterval(interval)
      }
   }, [typed]);

   const handleDiscard = async () => {
      setIsLoading("Discarding...")
      await Axios.get(`/story/delete/${data?.id}`)
      dispatch({ type: 'story', payload: null })
      setIsLoading(false)
      navigate('/create')
   }
   const handleSave = async () => {
      setIsLoading("Saving...")
      await Axios.get(`/chat/mcq/${data?.id}`).then(res => {
         console.log(res);
         dispatch({ type: 'story', payload: res?.data })
      })
      setIsLoading(false)
   }
   const handleQuestionare = async () => {
      setIsLoading("Preparing Questionare...")
      navigate('/questionare')
   }
   return (
      <Container sx={{ px: 3, py: 7 }}>
         <IconButton aria-label="play/pause" onClick={start} sx={{ bgcolor: 'primary.main' }}>
            {started ? isPaused ? <PlayArrow sx={{ height: 25, width: 25 }} /> : <Pause sx={{ height: 25, width: 25 }} /> : <PlayArrow sx={{ height: 25, width: 25 }} />}
            &nbsp;&nbsp;{started ? isPaused ? "Play" : "Pause" : "Play"}
         </IconButton>
         <Box
            id="image"
            sx={(theme) => ({
               mt: { xs: 2, sm: 8 },
               alignSelf: 'center',
               minHeight: { xs: 500, sm: 700 },
               width: '100%',
               borderRadius: '10px',
               outline: '1px solid',
               outlineColor:
                  theme.palette.mode === 'light'
                     ? alpha('#BFCCD9', 0.5)
                     : alpha('#9CCCFC', 0.1),
               boxShadow:
                  theme.palette.mode === 'light'
                     ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                     : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
               backdropFilter: "grayscale(48px)",
               backdropFilter: "blur(8px)",
            })}
         >
            <Container ref={containerRef} sx={{ p: 3, overflow: 'scroll', height: '70vh' }}>
               <ReactTyped sx={{ p: 5 }} showCursor={false} stopped={true} typedRef={setTyped} strings={[splitIntoParagraphs(data?.story)]} typeSpeed={60} />
            </Container>
            <ButtonGroup variant="contained" aria-label="Basic button group" fullWidth>
               {data?.mcq ?
                  <Button onClick={handleQuestionare}>Start Quiz</Button> :
                  data?.author?.id === user?.id &&
                  <>
                     <Button onClick={handleDiscard}>discard</Button>
                     <Button onClick={handleSave}>save & continue</Button>
                  </>}
            </ButtonGroup>
         </Box>
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

export default Story