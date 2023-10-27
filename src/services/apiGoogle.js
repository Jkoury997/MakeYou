const axios = require("axios")

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY



module.exports = {
    getReviewsData: async (placeId) => {
        try {
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}`);
            const reviews = response.data.result.reviews || [];
        
            const recentReviews = reviews.filter(review => new Date(review.time * 1000) > twoMonthsAgo);
            const averageRating = recentReviews.reduce((acc, review) => acc + review.rating, 0) / recentReviews.length || 0;
        
            //return { placeId, averageRating, numberOfReviews: recentReviews.length };
            return response.data.result
          } catch (error) {
            console.error(`Error al obtener las reseñas para el lugar ${placeId}:`, error);
            return { placeId, error: 'No se pudieron obtener las reseñas' };
          }
    }
}