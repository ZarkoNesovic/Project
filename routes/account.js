var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../db/authentification');
var db = require('../db/models')


/* GET home page. */
router.get('/',ensureAuthenticated, function (req, res, next) {
  
  var channel = db.channel;
  //console.log(req.user.channels)
  var channels = req.user.channels
  var channelNames = []
  var myChannels;

  



  User.findById(req.user._id).populate('channels').exec((err, data) => {
    console.log(data.channels);
    res.render('account', { title: 'Express', User: req.user, myChannels: data.channels });
  })
});











module.exports = router;