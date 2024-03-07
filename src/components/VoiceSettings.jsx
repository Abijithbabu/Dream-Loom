import React, { useState } from 'react'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Save } from '@mui/icons-material';

const VoiceSettings = () => {
   const [handlePlay, isPaused, handlePause, handleStop, voice, handleVoiceChange, pitch, handlePitchChange, rate, handleRateChange, volume, handleVolumeChange, updateSettings] = useTextToSpeech(' Once upon a time....')
   const [loading, setLoading] = useState(false);

   const save = () => {
      setLoading(true);
      updateSettings()
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   };

   const restoreDefaults = () => {
      const event = (value) => ({ target: { value } })
      handleVoiceChange(event(0))
      handlePitchChange(event(1))
      handleRateChange(event(0.6))
      handleVolumeChange(event(0.8))
   }
   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 13,
            maxWidth: '70vw',
            borderRadius: '10px',
         }}>
         <Box variant="outlined" sx={{ backdropFilter: 'blur(15px)', maxWidth: '90vw', p: 3, borderRadius: '20px', borderColor: '#', borderStyle: 'double' }}>
            <table>
               <tr>
                  <td><Typography p={1}>Voice :</Typography></td>
                  <td><select value={voice} style={{ width: '50vw' }} onChange={handleVoiceChange}>
                     {window.speechSynthesis.getVoices().map((voice, index) => (
                        <option key={voice.name} value={index}>
                           {voice.name}
                        </option>
                     ))}
                  </select></td>
               </tr>
               <tr>
                  <td><Typography p={1}>Pitch : </Typography></td>
                  <td><label><input
                     type="range"
                     min="0.5"
                     max="2"
                     step="0.1"
                     value={pitch}
                     onChange={handlePitchChange}
                  /></label></td>
               </tr>
               <tr>
                  <Typography p={1}>Speed:</Typography>
                  <td><Typography><input
                     type="range"
                     min="0.5"
                     max="2"
                     step="0.1"
                     value={rate}
                     onChange={handleRateChange}
                  /></Typography></td>
               </tr>
               <tr >
                  <td><Typography p={1}>  Volume:</Typography ></td>
                  <td><input
                     type="range"
                     min="0"
                     max="1"
                     step="0.1"
                     value={volume}
                     onChange={handleVolumeChange}
                  /></td>
               </tr>
               <tr>
                  <td><Typography></Typography></td>
                  <td><Typography></Typography></td>
               </tr>
            </table>
            <ButtonGroup variant="standard" aria-label="Loading button group" sx={{ pt: 1, backgroundColor: 'secondary.main' }}>
               <Button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
               <Button onClick={handleStop}>Pause</Button>
               <Button onClick={restoreDefaults}>Default</Button>
               <LoadingButton onClick={save} loading={loading} loadingPosition="start" startIcon={<Save />}>
                  Save
               </LoadingButton>
            </ButtonGroup>
         </Box>
      </Container>
   )
}

export default VoiceSettings