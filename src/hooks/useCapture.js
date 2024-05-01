import { useState } from "react";

const useCapture = (videoRef, canvasRef) => {
    const [capturedImage, setCapturedImage] = useState(null);
    const handleCapture = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;

            video.onloadedmetadata = () => {
                video.play();
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataURL);
            };
        }
    };
    return [handleCapture, capturedImage]
}

export default useCapture