var express = require('express');
var router = express.Router();
var short = require('short-uuid');

var db = require('../db/models')

router.get('/', (req, res, next) => {
  res.render('register');

})
/* GET home page. */
router.post('/', (req, res, next) => {
  //console.log(req.body)
  var channelId = short.generate();
  newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  newUser.channels.push(channelId)
  newUser.save();

  var readApiKey = short.generate();
  var writeApiKey = short.generate();
  var newChannel = new channelData({
    channelId: channelId,
    readApiKey:readApiKey,
    writeApiKey:writeApiKey

  })
  newChannel.save()


  res.redirect('/')
});

module.exports = router;