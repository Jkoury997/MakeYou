module.exports = (req, res, next) => {
    // Verificar si userdata y token existen en la sesión
    if (!req.session.userData.Token) {
        // Si el token no existe, redireccionar al login
        return res.redirect('/auth/login');
    } else {
        // Si el token existe, permitir que la solicitud continúe
        return next();
    }
}

