var express = require('express');
var router = express.Router();
var short = require('short-uuid');
var db = require('../db/models');
var moment = require('moment');
var mongoose = require('mongoose');

var Joi = require('@hapi/joi');
var UrlSchemma = require('./routesValidation/channelWriteValidationSchema')

/* GET home page. */
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    var Channel = db.channel;

    Channel.findOne({ channelId: id }).then(data => {

        //console.log(data.channelData.length)
        res.render('channel', { title: 'Express', User: req.user, channel: data });
    })
})
router.get('/create/new', (req, res, next) => {
    res.render('newChannel', {});
})


router.delete('/delete/:id', (req, res, next) => {
    //ruta za brisanje kanala
    //Ostavi za kraj
})

router.post('/new', (req, res, next) => {
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
            writeApiKey: short.generate()
        })
        newChannel.save();

        User.channels.push(newChannel);
        User.save()
    })
    res.redirect('/account');
})

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
            //console.log(channel)
            Object.keys(validation.value).forEach((data) => {
                //i++;
                //console.log(i)
                console.log(validation.value[data])
                var newValue = new value({
                    _id: new mongoose.Types.ObjectId(),
                    value: validation.value[data],
                    fieldValue: data,
                    time: moment().format()
                })
                //console.log(newValue)
                newValue.save();
                channel.channelData.push(newValue);

            });
            channel.save()
        });
        res.end('Success')
    }
    else {
        res.send('Errr')
    }


    var array;
    var writeApiKey = req.params.writeapikey;
    //console.log(writeApiKey);
    var time = moment().format();
    /*
        if (Object.keys(req.query).length > 7) {
            res.send('Invalid request')
        }
        for (i = 0; i < 7; i++) {
            var str = 'value' + i
            if (req.query[str]) {
                valueW.value.push({ field: str, fieldValue: req.query[str] })
            }
        }
    */

})

module.exports = router;