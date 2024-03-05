import React from 'react'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

const VoiceSettings = () => {
    const [handlePlay, isPaused, handlePause, handleStop, voice, handleVoiceChange, pitch, handlePitchChange, rate, handleRateChange, volume, handleVolumeChange, updateSettings] = useTextToSpeech(' Once upon a time....')
    const dispatch = useDispatch()
    const restoreDefaults = () =>{
        dispatch({ type: 'speech', payload: { voice:0, pitch:1, rate:0.5, volume:1 } })
    }
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 13,
                borderRadius: '10px',
            }}>
            <Box variant="outlined" sx={{ backdropFilter: 'blur(15px)',p:3, borderRadius:'20px',borderColor:'#' ,borderStyle:'double'}}> 
                <table>
                    <tr>
                        <td><Typography p={1}>Voice :</Typography></td>
                        <td><select value={voice} onChange={handleVoiceChange}>
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
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box style={{ height: 50, textAlign: 'left', padding: 5 }}>
                            <Button variant='contained' onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ height: 50, textAlign: 'center', padding: 5 }}>
                            <Button variant='contained' onClick={handleStop}>Pause</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ height: 50, textAlign: 'center', padding: 5 }}>
                            <Button variant='contained' onClick={restoreDefaults}>Default</Button>
                            </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box style={{ height: 50, textAlign: 'center', padding: 5 }}>
                            <Button variant='contained' onClick={updateSettings}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>



            </Box>
        </Container>
    )
}

export default VoiceSettings