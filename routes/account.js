var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../db/authentification');


/* GET home page. */
router.get('/',ensureAuthenticated, function (req, res, next) {
    res.render('account', { title: 'Express' , User:req.user});
});

module.exports = router;