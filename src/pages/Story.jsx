import React, { useState } from 'react'
import { Box, Button, Container, alpha } from '@mui/material'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { useSelector } from 'react-redux'
import { ReactTyped } from 'react-typed'
import splitIntoParagraphs from '../helpers/splitIntoPara'

const Story = () => {
   const story = useSelector((state) => state?.story?.content)
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

   return (
      <Container sx={{ px: 3, py: 8 }}>
         <div>
            <Button onClick={start}>{started ? isPaused ? "Play" : "Pause" : "Play"}</Button>
         </div>
         <Box
            id="image"
            sx={(theme) => ({
               mt: { xs: 8, sm: 10 },
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
            })}
         >
            <Container sx={{ p: 3 }}>
               <ReactTyped sx={{ p: 5 }} showCursor={false} stopped={true} typedRef={setTyped} strings={[splitIntoParagraphs(story)]} typeSpeed={40} />
            </Container>
         </Box>
      </Container>
   )
}

export default Story