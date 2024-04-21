const authService = require('../services/authService');

module.exports = {
    registerUser : async (req, res) => {
    try {
        const { name, surname , documentNumber,username, email, password  } = req.body;
        const user = await authService.createUser({ name, surname , documentNumber, username, email, password });

        res.status(201).json({
        message: 'Usuario registrado con éxito',
        user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    },
    login: async (req,res) => {
        try{
            const {email,password} = req.body;
            const { token, ...userDetails } = await authService.loginUser({email, password });
            res.status(201).json({
                message:"Incio de session correcto",
                user : userDetails,
                token
            })
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    verifyToken: async (req, res) => {
        res.status(200).json({
          message: 'El token es válido',
          user: req.user // Datos del usuario decodificados del token
        });
      }
};
