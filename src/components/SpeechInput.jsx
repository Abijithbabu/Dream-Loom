import { CancelTwoTone, Mic, MicOff, SettingsVoice } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechInput = ({ dispatch }) => {
   const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

   useEffect(() => {
      dispatch(transcript)
   }, [transcript])

   return (
      <Stack direction={'row'} alignItems={'center'}spacing={1} justifyContent={'center'}>
         {browserSupportsSpeechRecognition ?
            <>
               {listening ?
                  <>
                     <IconButton onClick={SpeechRecognition.stopListening} sx={{ bgcolor: 'red', height: 65, width: 65 }}>
                        <SettingsVoice fontSize='large' />
                     </IconButton>
                     <Typography>listening....</Typography>
                  </>
                  :
                  <IconButton onClick={startListening} sx={{ bgcolor: 'secondary.main', height: 65, width: 65 }}>
                     <Mic fontSize='large' />
                  </IconButton>
               }
               {!!transcript.length && !listening &&
                  <IconButton onClick={resetTranscript} sx={{ bgcolor: 'red', height: 65, width: 65 }}>
                     <CancelTwoTone fontSize='large' />
                  </IconButton>
               }
            </>
            :
            <IconButton sx={{ bgcolor: 'secondary.main', height: 65, width: 65 }}>
               <MicOff fontSize='large' />
            </IconButton>}
      </Stack>
   )
}

export default SpeechInput