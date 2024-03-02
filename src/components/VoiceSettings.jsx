import React from 'react'
import useTextToSpeech from '../hooks/useTestToSpeech'
import { Container } from '@mui/material'

const VoiceSettings = () => {
    const [handlePlay, isPaused, handlePause, handleStop, voice, handleVoiceChange, pitch, handlePitchChange, rate, handleRateChange, volume, handleVolumeChange, updateSettings] = useTextToSpeech(' Once upon a time....')

    return (
        <Container sx={{ px: 3, py: 8 }}>
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

                <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={updateSettings}>Save</button>
            </div>
        </Container>
    )
}

export default VoiceSettings