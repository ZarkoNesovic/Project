var express = require('express');
var router = express.Router();
var short = require('short-uuid');
var db = require('../db/models');
var moment = require('moment');
var mongoose = require('mongoose');
var common = require('../socket/commonEventEmmiter');
var { DateTime } = require('luxon');//Vreme
const { ensureAuthenticated, forwardAuthenticated } = require('../db/authentification');//Autentifikacija


var Joi = require('@hapi/joi');
var UrlSchemma = require('./routesValidation/channelWriteValidationSchema');
var timeFormat='YYYY-MM-DD HH:MM:ss'

/* GET home page. */
router.get('/:id',ensureAuthenticated, function (req, res, next) {
    
    var id = req.params.id;
    
    var Channel = db.channel;

    Channel.findOne({ channelID: id }).populate({ path: 'channelData', options: { limit: 1000 } }).exec((err, data) => {

        res.render('channel', { title: 'Express', User: req.user, channel: data });
    });
    //console.log(data)
    
})

router.get('/create/new',ensureAuthenticated, (req, res, next) => {
    res.render('newChannel', {});
})


router.delete('/delete/data',ensureAuthenticated, (req, res, next) => {
    var Channel = db.channel;
    var values=db.value;
    var User=db.User;
    console.log('Delete')
    console.log(req.user)
    


    Channel.findOne({ channelID: req.body.id }).then(channel=>{
        //console.log(channel._id)


        

        for(i=0;i<channel.channelData.length;i++){
            values.deleteOne({ _id:channel.channelData[i] }, function (err) {});
            
        }

    })
        
    //values.deleteOne({ _id:"5e55394c2dd87e1f94111990" }, function (err) {});



   
    res.end('Data deleted');
})

router.delete('/delete/channel',ensureAuthenticated, (req, res, next) => {
    var Channel = db.channel;
    var values=db.value;
    var User=db.User;
    console.log('Delete')
    console.log(req.body.id)
//Ispraviti prvo naci korisnika i proveriti da li mu je to jednini kanal i ako jeste ne brisati nista i dati korisniku informaciju o tome
    Channel.findOneAndDelete({ channelID: req.body.id }).then(channel=>{
        //console.log(channel.channelData)
        User.findOne({email:req.user.email}).then(user=>{
        {           
            
            }
            console.log(user.channels.length==1)
            if(user.channels.length==1){
                user.channels=[]
                user.save();
                
            }else{
                for(i=0;i<user.channels.length;i++){
                    if(user.channels[i]==channel.id){
                        user.channels.splice(i,i);
                        
                        
                    }

            }
    
            user.save();
        }
        })


        for(i=0;i<channel.channelData.length;i++){
            values.deleteOne({ _id:channel.channelData[i] }, function (err) {});
            
        }
    })
        
    //values.deleteOne({ _id:"5e55394c2dd87e1f94111990" }, function (err) {});



   
    res.end('Channel deleted');
})

router.post('/new',ensureAuthenticated ,(req, res, next) => {
    //res.send(short.generate());

    var User = db.User;
    var Channel = db.channel;
    var name = req.body.name;
    var description = req.body.description;
    var id = short.generate();

    User.findOne({ _id: req.user._id }).then(User => {

        var newChannel = new channel({
            _id: new mongoose.Types.ObjectId(),
            channelName: name,
            descriptin: description,
            readApiKey: short.generate(),
            writeApiKey: short.generate(),
            channelID:short.generate()

        })
        newChannel.save();

        User.channels.push(newChannel);
        User.save()
    })
    res.redirect('/account');
})

//Za upis http://localhost:3000/channel/jM2XvDzCiv9NUVrZGxUqzW/write?field0=10

router.get('/:writeapikey/write', (req, res, next) => {
    var writeApiKey = req.params.writeapikey
    var x = req.query
    var validation = UrlSchemma.validate(x);
    //console.log(validation);
    //console.log(validation.error)
    if (validation.error == undefined) {
        //console.log(validation.value.field1)
        //var i = 100;
        db.channel.findOne({ writeApiKey: writeApiKey }).then((channel) => {
            //console.log(channel == null)
            if (channel == null) {
                res.end('ThatChannel doesnt exist')
            }
            else {
                Object.keys(validation.value).forEach((data) => {
                    //i++;
                    //console.log(i)
                    //var timeNow = moment().format(timeFormat);
                    //console.log(timeNow)
                    
                   
                    now=DateTime.local()
                    timeNow=now.toISO()
                    //console.log(nowISO)

                    //console.log(validation.value[data])
                    var newValue = new value({
                        _id: new mongoose.Types.ObjectId(),
                        value: validation.value[data],
                        fieldValue: data,
                        time: timeNow
                    })
                    //console.log(newValue)
                    newValue.save();
                    channel.channelData.push(newValue);
                    common.emit('ChannelFieldValue', { channelID: channel.channelID, value: validation.value[data], fieldValue: data, time: timeNow });
                });
                channel.save();
                res.end('Success');
            }
        });

    }
    else {
        res.end('Error')
    }


})

module.exports = router;