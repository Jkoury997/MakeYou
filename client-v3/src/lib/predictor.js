// predictor.js

import * as tf from '@tensorflow/tfjs';
import { isWeekend, getDayOfWeek, isStartOfMonth, isHoliday } from './dateUtils'; // Supón que has definido estas funciones en otro archivo

// Cargar el modelo
let model = null;

export const loadModel = async (modelPath) => {
  if (!model) {
    model = await tf.loadLayersModel(modelPath);
  }
};

// Realizar la predicción
export const predict = (inputs) => {
  if (!model) {
    throw new Error("Model not loaded. Please call loadModel first.");
  }

  // Convertir inputs a tensor 2D
  const inputTensor = tf.tensor2d([inputs]);

  // Realizar la predicción
  const prediction = model.predict(inputTensor);
  const predictedValue = prediction.dataSync()[0]; // Obtiene el primer valor de la predicción
  return predictedValue;
};
