import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

const TextToSpeech = (text) => {

   const state = useSelector((state) => state?.speech)
   const [isPaused, setIsPaused] = useState(false);
   const [utterance, setUtterance] = useState(null);
   const [voice, setVoice] = useState( state?.voice ?? 0);
   const [pitch, setPitch] = useState(state?.pitch ?? 1);
   const [rate, setRate] = useState(state?.rate ?? 1);
   const [volume, setVolume] = useState(state?.volume ?? 1);
   const dispatch = useDispatch()
   const updateSettings = () => dispatch({ type: 'speech', payload: { voice, pitch, rate, volume } })
   
   useEffect(() => {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      setUtterance(u);
      const voices = synth.getVoices();

      if (isPaused) {
         synth.resume();
      } else {
         u.voice = voices?.[voice] ?? null;
         u.pitch = pitch;
         u.rate = rate;
         u.volume = volume;
      }

      return () => {
         synth.cancel();
         synth.removeEventListener("voiceschanged", () => {
            setVoice(null);
         });
      };
   }, [text]);

   const handlePlay = () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      if (isPaused) {
         synth.resume();
      } else {
         console.log(voices?.[voice]);
         utterance.voice = voices?.[voice]
         utterance.pitch = pitch;
         utterance.rate = rate;
         utterance.volume = volume;
         synth.speak(utterance);
      }
      setIsPaused(false);
   };

   const handlePause = () => {
      const synth = window.speechSynthesis;
      setIsPaused(true);
      synth.pause();
   };

   const handleStop = () => {
      const synth = window.speechSynthesis;
      setIsPaused(false);
      synth.cancel();
   };

   const handleVoiceChange = (event) => {
      setVoice(event.target.value)
   };

   const handlePitchChange = (event) => {
      setPitch(parseFloat(event.target.value));
   };

   const handleRateChange = (event) => {
      setRate(parseFloat(event.target.value));
   };

   const handleVolumeChange = (event) => {
      setVolume(parseFloat(event.target.value));
   };

   return [handlePlay, isPaused, handlePause, handleStop, voice, handleVoiceChange, pitch, handlePitchChange, rate, handleRateChange, volume, handleVolumeChange, updateSettings]

};

export default TextToSpeech;