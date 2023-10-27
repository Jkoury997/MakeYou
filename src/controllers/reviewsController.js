const { getReviewsData } = require('../services/apiGoogle');
module.exports = {
    showReviews: async (req,res) => {
           const oldData = req.session.oldData
        try {
            const places = ['ChIJq0100X_LvJURVAF8e7rzd64',"ChIJCf8Aq9Mvo5URWEmVTHH3yrA"];
            const reviewsData = await Promise.all(places.map(getReviewsData));
            console.log(reviewsData)
            res.render("./analytics/reviews", {
                userName: req.session.userData, // Agregado para ventas previas
                oldData: oldData ? oldData : null,
                reviews: reviewsData
            })
          } catch (error) {
            console.error('Error en el endpoint /compare-reviews:', error);
            res.status(500).send('Ocurrió un error al obtener las reseñas');
        }
    }
}