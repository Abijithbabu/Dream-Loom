import { useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'

const useFaceApi = (videoRef, canvasRef) => {

    const [detections, setDetections] = useState([])

    useEffect(() => {
        startVideo()
        videoRef && loadModels()
    }, [])

    // OPEN YOUR FACECAM / WEBCAM 
    const startVideo = () => {
        navigator?.mediaDevices?.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // LOAD MODELS FROM FACE API 
    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models")

        ]).then(() => {
            detectFace()
        })
    }

    const detectFace = () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            ).withFaceLandmarks().withFaceExpressions()

            const expressionArray = detections?.[0]?.expressions ? Object.entries(detections?.[0]?.expressions) : []
            expressionArray.sort((a, b) => b[1] - a[1]);
            setDetections(expressionArray)

            // DRAW YOU FACE IN WEBCAM
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            faceapi.matchDimensions(canvasRef.current, {
                width: videoRef.current.width,
                height: videoRef.current.height
            })

            const resized = faceapi.resizeResults(detections, {
                width: videoRef.current.width,
                height: videoRef.current.height
            })

            faceapi.draw.drawDetections(canvasRef.current, resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized)

        }, 1000)
    }
    return detections
}

export default useFaceApi