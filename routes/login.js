var express = require('express');
var router = express.Router();
var passport = require('passport')

var db = require('../db/models')

router.get('/',(req,res,next)=>{
  res.render('login')
})
/* GET home page. */
/*
router.post('/', (req, res, next) => {   
  
  passport.authenticate('local',{
    successRedirect: '/account',
    failureRedirect: '/',        
  })(req, res, next);
});
*/
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: false
  })(req, res, next);
});
module.exports = router;