var express = require('express');
var router = express.Router();
var passport = require('passport')

var db = require('../db/models')

router.get('/',(req,res,next)=>{
    res.logout();
    res.redirect('/');
})
/* GET home page. */


module.exports = router;