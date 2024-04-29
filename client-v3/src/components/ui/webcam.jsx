

import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export function CameraScanner({ onCapture }) {
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"  // Utiliza la cámara trasera
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="camera-scanner">
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center">
        Capturar
      </button>
    </div>
  );
}