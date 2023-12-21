module.exports = {
    ShowRead: function (req,res) {
        
        res.render("./process/readMachine", {
            userName: req.session.userData
         })
            
    }
}