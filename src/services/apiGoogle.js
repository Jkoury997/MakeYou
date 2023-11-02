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
          return await PlaceID.find();
      } catch (error) {
          console.error('Error al recuperar los Places ID:', error.message || error);
          throw error;
      }
  }, 
}