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

            res.render("selectBussines", { 
                message: "Ingreso correcto.",
                user : response.Nombre, 
                business : response.Empresas, });
        } catch (error) {
            res.render("login", { message: "Error durante la autenticación." });
        }
    },

    
}