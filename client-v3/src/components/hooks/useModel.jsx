import { useState, useEffect } from 'react';

const useModel = async (modelUrl) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      if (typeof window !== "undefined" && window.tf) {
        try {
          console.log('Loading model from');
          const loadedModel = await window.tf.loadLayersModel(modelUrl);
          setModel(loadedModel);
          console.log('Model loaded successfully');
        } catch (error) {
          console.error('Error loading model:', error);
        }
      }
    };

    loadModel();
  }, [modelUrl]);

  return model;
};

export default useModel;