const axios = require("axios")
const PlaceID = require('../database/models/placeID'); 

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY



module.exports = {
    getReviewsData: async (placeId) => {
        try {
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}`);
        
            return response.data.result
          } catch (error) {
            console.error(`Error al obtener las reseñas para el lugar ${placeId}:`, error);
            return { placeId, error: 'No se pudieron obtener las reseñas' };
          }
    },
    save: async function (placeId) {
      try {
        const newPlaceID = new PlaceID(placeId);
        await newPlaceID.save();
        return newPlaceID;
    } catch (error) {
        console.error('Error al guardar el Place ID:', error.message || error);
        throw error;
    }
    
    },
    findAll: async function() {
      try {
          // Encuentra todos los documentos y selecciona solo el campo 'placeID'
    const documents = await PlaceID.find().select('placeID');
    // Mapea los resultados para obtener un arreglo solo con los placeIDs
    const placeIDs = documents.map(doc => doc.placeID);
    return placeIDs;
      } catch (error) {
          console.error('Error al recuperar los Places ID:', error.message || error);
          throw error;
      }
    }

  } 