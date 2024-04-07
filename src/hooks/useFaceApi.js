import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useSelector } from 'react-redux';

const useFaceApi = (videoRef, canvasRef) => {
   const detectface = useSelector(state => state?.faceRecognition);
   const [detections, setDetections] = useState();
   const [start, setStart] = useState(false);

   useEffect(() => {
      if (detectface) {
         startVideo();
         videoRef && loadModels();
      }
   }, [])

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (start) detectFace()
      }, 1000);
      return () => clearInterval(intervalId);
   }, [start]);

   // OPEN YOUR FACECAM / WEBCAM 
   const startVideo = () => {
      navigator?.mediaDevices?.getUserMedia({ video: true })
         .then((currentStream) => {
            videoRef.current.srcObject = currentStream;
         })
         .catch((err) => {
            console.log(err);
         });
   };

   // LOAD MODELS FROM FACE API 
   const loadModels = () => {
      Promise.all([
         faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
         faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
         faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
         faceapi.nets.faceExpressionNet.loadFromUri("/models")

      ]).then(() => {
         setStart(true);
      });
   };

   const detectFace = async () => {
      try {
         const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
         ).withFaceLandmarks().withFaceExpressions();

         const expressionArray = detections?.[0]?.expressions ? Object.entries(detections?.[0]?.expressions) : [];
         expressionArray.sort((a, b) => b[1] - a[1]);
         setDetections(expressionArray);

         // DRAW YOUR FACE IN WEBCAM
         canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
         faceapi.matchDimensions(canvasRef.current, {
            width: videoRef.current.width,
            height: videoRef.current.height
         });

         const resized = faceapi.resizeResults(detections, {
            width: videoRef.current.width,
            height: videoRef.current.height
         });

         faceapi.draw.drawDetections(canvasRef.current, resized);
         faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
         faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      } catch (error) {
         console.warn(error)
      }
   };

   return detections
};

export default useFaceApi;
