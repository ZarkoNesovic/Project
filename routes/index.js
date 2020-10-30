var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log(req.cookies);
  //console.log('------------');
  //console.log(req.session);
  if(req.isAuthenticated()){
    res.redirect('/account')
  }else{
  res.render('index', { title: 'Express' });
  }
});
router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/');
})
module.exports = router;
