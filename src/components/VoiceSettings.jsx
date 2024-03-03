import React from 'react'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { Button, Container } from '@mui/material'

const VoiceSettings = () => {
    const [handlePlay, isPaused, handlePause, handleStop, voice, handleVoiceChange, pitch, handlePitchChange, rate, handleRateChange, volume, handleVolumeChange, updateSettings] = useTextToSpeech(' Once upon a time....')

    return (
        <Container
        sx={{
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           pt: 13,
           borderRadius:'10px'
           
        }}>
            <div>
                <label>
                    Voice:
                    <select value={voice} onChange={handleVoiceChange}>
                        {window.speechSynthesis.getVoices().map((voice,index) => (
                            <option key={voice.name} value={index}>
                                {voice.name}
                            </option>
                        ))}
                    </select>
                </label>

                <br />

                <label>
                    Pitch:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={pitch}
                        onChange={handlePitchChange}
                    />
                </label>

                <br />

                <label>
                    Speed:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={rate}
                        onChange={handleRateChange}
                    />
                </label>
                <br />
                <label>
                    Volume:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </label>

                <br />

                <Button variant='contained' onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
                <Button variant='contained' onClick={handlePause}>Pause</Button>
                <Button variant='contained' onClick={handleStop}>Stop</Button>
                <Button variant='contained' onClick={updateSettings}>Save</Button>
            </div>
        </Container>
    )
}

export default VoiceSettings