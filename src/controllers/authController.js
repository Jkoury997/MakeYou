const authServices = require("../services/authServices")

module.exports = {
    login: (req, res) => {
        res.render("login", { message: null })
    },
    authLogin: async (req, res) => {
        try {
            let response = await authServices.login(req.body.password, req.body.email);

            if (!response.Estado) {
                return res.render("login", { message: "Login incorrecto." });
            }
            req.session.userData = response.AccessKey
            res.render("selectBussines", { 
                message: "Ingreso correcto.",
                user : response.Nombre, 
                business : response.Empresas, });
        } catch (error) {
            res.render("login", { message: "Error durante la autenticación." });
        }
    },
    authBusiness:  async (req, res) => {
        try {
            let response = await authServices.bussines(Number(req.body.id), req.session.userData);

            if (!response.Estado) {
                return res.send("Incorrecto")
            }

            req.session.userData = {
                Token: response.Token,
                Nombre: response.Nombre
             }
            res.redirect("/admin/dashboard")
            
        } catch (error) {
            res.render("login", { message: "Error durante la autenticación." });
        }
    },
    
}