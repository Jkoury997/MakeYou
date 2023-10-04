module.exports = {
    showCreate: function (req,res) {
        res.render("./qr/create",{userName: req.session.userData})
    },
    list: function (req,res) {
        res.render("./qr/list",{userName: req.session.userData})
    },
    create: function (req,res) {
        console.log(req.body)
    }
}