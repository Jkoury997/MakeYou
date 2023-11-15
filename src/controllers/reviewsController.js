const { getReviewsData } = require('../services/apiGoogle');
const apiGoogle = require('../services/apiGoogle');
module.exports = {
    showReviews: async (req,res) => {
           const oldData = req.session.oldData
        try {
            const places = await apiGoogle.findAll();
            console.log(places)
            
            const reviewsData = await Promise.all(places.map(getReviewsData));

            res.render("./analytics/reviews", {
                userName: req.session.userData, // Agregado para ventas previas
                oldData: oldData ? oldData : null,
                reviews: reviewsData
            })
          } catch (error) {
            console.error('Error en el endpoint /compare-reviews:', error);
            res.status(500).send('Ocurrió un error al obtener las reseñas');
        }
    },
    addPlaceId: async (req,res) => {
        try {
            const placeID = req.body.placeID
            await apiGoogle.save(placeID)
            res.redirect("/admin/analytics/reviews")

        } catch (error) {
            console.error('Error en agregar placeID:', error);
            res.status(500).send('Ocurrió un error al guarda PlaceID');
        }
    }
}