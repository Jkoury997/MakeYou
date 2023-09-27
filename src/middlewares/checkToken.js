module.exports = (req, res, next) => {
    // Verificar si userData y Token existen en la sesión y que Token no sea undefined
    if (!req.session.userData || !req.session.userData.Token || req.session.userData.Token === undefined) {
        // Si el token no existe o es undefined, redireccionar al login
        return res.redirect('/auth/login');
    } else {
        // Si el token existe y no es undefined, permitir que la solicitud continúe
        console.log(req.session.userData.Token)
        return next();
    }
}
