import React, { useRef } from 'react'
import useFaceApi from '../hooks/useFaceApi'
import { ExpressionToEmoji } from '../helpers/emoji'

const FaceDetection = () => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const detections = useFaceApi(videoRef, canvasRef)

  return (
    <div className="myapp" >
      <h1>Emotion Detection <span dangerouslySetInnerHTML={{ __html: ExpressionToEmoji(detections?.[0]?.[0]) }}></span></h1>
      <div className="appvideo" >
        <video crossOrigin="anonymous" ref={videoRef} width={'100%'} autoPlay></video>
      </div>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: 'absolute'}}
        className="appcanvas"
      />
    </div>
  )
}

export default FaceDetection