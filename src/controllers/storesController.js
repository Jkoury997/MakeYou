const storesServices = require("../services/storesServices")



module.exports = {
    listStores: async function (req,res) {
        try {
            let data = req.session.userData;
            const storesResponse = await storesServices.getStores(data.Token);
    
            if (storesResponse && storesResponse.Lista) {
                res.render("./stores/storesSelect", {
                    stores: storesResponse.Lista,
                    userName: req.session.userData
                });
            } else {
                // Maneja el caso cuando 'storesResponse' o 'storesResponse.Lista' es undefined.
                res.status(500).send("Error: No se pudieron obtener las tiendas");
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    listProductsToPick: async function (req,res){
        try {
            let data = req.session.userData;
            const productsResponse = await storesServices.products(data.Token,req.body.id); //Hace la consulta al servicio de la api
            const rubrosUnicos = storesServices.getRubros(productsResponse.Articulos);// extrae los rubros y saca los repetidos
            productsResponse.Articulos = productsResponse.Articulos.filter(product => product.Stock > 0); //Solo usa los que tiene stock
            if (productsResponse && productsResponse.Articulos) {
                res.render("./stores/productsToPick", { 
                    products: productsResponse.Articulos,
                    store: productsResponse.Tienda,
                    rubros: rubrosUnicos,
                    userName: req.session.userData,
                    });
            } else {
                // Maneja el caso cuando 'storesResponse' o 'storesResponse.Lista' es undefined.
                res.status(500).send("Error: No se pudieron obtener las tiendas");
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    showSaleStores: function (req,res) {
        let oldData = req.session.oldData
        
        res.render("./analytics/saleStores", {
            userName: req.session.userData,
            stores: [],
            prevStores:[],
            oldData: oldData ? oldData : null,

        })
    },
    salesStores: async function (req,res) {
        try {

            let oldData = req.session.oldData
            oldData = {
                dateFrom: req.body.dateFrom ? req.body.dateFrom : null,
                dateTo: req.body.dateTo ? req.body.dateTo : null,
                comparative: req.body.comparative ? req.body.comparative : null
            }

            let data = req.session.userData;

            const salesResponse = await storesServices.sales(data.Token,req.body.dateFrom,req.body.dateTo);
            let prevSalesResponse = await storesServices.comparative(req.body.dateFrom,req.body.dateTo,req.body.comparative,data.Token)
            prevSalesResponse = prevSalesResponse != null ? storesServices.calculateDiferent(salesResponse.Variables,prevSalesResponse) : null
            

            res.render("./analytics/saleStores", {
                userName: req.session.userData,
                stores: salesResponse.Variables,
                prevStores: prevSalesResponse ? prevSalesResponse : null, // Agregado para ventas previas
                oldData: oldData ? oldData : null,
            })
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
}