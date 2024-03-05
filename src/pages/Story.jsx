import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, IconButton, alpha } from '@mui/material'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { useSelector } from 'react-redux'
import { ReactTyped } from 'react-typed'
import splitIntoParagraphs from '../helpers/splitIntoPara'
import { Pause, PlayArrow } from '@mui/icons-material'

const Story = () => {
   const story = useSelector((state) => state?.story?.story)
   const [started, setStarted] = useState(false)
   const [typed, setTyped] = React.useState()
   const [handlePlay, isPaused, handlePause] = useTextToSpeech(story)
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


   return (
      <Container sx={{ px: 3, py: 8 }}>
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
               <ReactTyped sx={{ p: 5 }} showCursor={false} stopped={true} typedRef={setTyped} strings={[splitIntoParagraphs(story)]} typeSpeed={60} />
            </Container>
         </Box>
      </Container>
   )
}

export default Story