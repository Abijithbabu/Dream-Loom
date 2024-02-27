import React, { useRef } from 'react'
import useFaceApi from '../hooks/useFaceApi'
import { ExpressionToEmoji } from '../helpers/emoji'
import { useMediaQuery } from '@mui/material'

const FaceDetection = () => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const detections = useFaceApi(videoRef, canvasRef)
  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <div className="myapp" >
      <h1>Emotion Detection <span dangerouslySetInnerHTML={{ __html: ExpressionToEmoji(detections?.[0]?.[0]) }}></span></h1>
      <div className="appvideo" >
        <video crossOrigin="anonymous" ref={videoRef} width={sm ? 640 : 400} height={sm ? 480 : 500} autoPlay></video>
      </div>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute' }}
        className="appcanvas"
      />
    </div>
  )
}

export default FaceDetection