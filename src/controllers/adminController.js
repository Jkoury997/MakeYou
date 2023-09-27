

module.exports = {
    home: (req, res) => {
        res.render("admin/dashboard",{userName: req.session.userData.Nombre})
    },
}