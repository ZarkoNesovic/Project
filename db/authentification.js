module.exports = {
    ensureAuthenticated: function (req, res, next) {       
        console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next();
        }        
        else{
        res.send('Nedozvoljen pristup');
        }
        //res.redirect('/users/login');
    },

    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
};
