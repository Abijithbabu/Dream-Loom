import React, { useRef } from 'react'
import useFaceApi from '../hooks/useFaceApi'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'

const FaceDetection = () => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const detections = useFaceApi(videoRef, canvasRef)
  const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: sm ? 22 : 22,
          height: 510,
          borderRadius: '10px',
          zIndex: 1000,
        }}>

        <div className="myapp" >
          <div className="appvideo"  >
            <video crossOrigin="anonymous" ref={videoRef} width={sm ? 640 : 400} height={sm ? 480 : 500} autoPlay></video>
          </div>
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute' }}
            className="appcanvas"
          />
        </div>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box variant="outlined" sx={{
          backdropFilter: 'blur(15px)',
          my: 8,
          p: 3,
          minHeight: '220px',
          minWidth: 400,
          borderRadius: '20px',
          borderStyle: 'double'
        }}>
          {detections?.map(x => <Typography>{`${x[0]} : ${x[1]}`}</Typography>)}
        </Box>
      </Container>

    </>
  )
}

export default FaceDetection