var express = require('express');
var router = express.Router();
var short = require('short-uuid');
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
var db = require('../db/models')

router.get('/', (req, res, next) => {
  var errorMessage={email:'',username:''}
  res.render('register',{message:errorMessage});

})
/* GET home page. */


router.post('/', (req, res, next) => {
  //console.log(req.body)
  var User=db.User;
  User.findOne({email:req.body.email}).then(user=>{
    var message={};    
    if(user){
      if(user.email==req.body.email){
        message.email='This email already exists';
      }
      if(user.email==req.body.email){
        message.username='This username already exists';
      }
      res.render('register', {message:message})
    }
    else{
      newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });
        defaultChannel=new channel({
        _id:new mongoose.Types.ObjectId(), 
        channelName:'Default',
         descriptin:'This is default channel generated on registration',
         channelID:short.generate(),
         readApiKey:short.generate(),
         writeApiKey:short.generate()
        })
        defaultChannel.save();
        newUser.channels.push(defaultChannel)
        newUser.save();
      res.redirect('/')
    }
  }) 
});

router.get('/test', (req, res, next) => {
  db.channelData.findOne({ channelName: 'default' }).populate('channelData').exec((err, data) => {
    console.log(data)
  })
  res.end()
})

module.exports = router;