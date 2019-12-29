var express = require('express');
var router = express.Router();
var short = require('short-uuid');
var db = require('../db/models')
var moment = require('moment')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('channel', { title: 'Express', User: req.user });
});

router.get('/new', (req, res, next) => {
    res.render('newChannel', {});

})

router.post('/new', (req, res, next) => {
    //res.send(short.generate());
    
    var User = db.User;
    var Channel = db.channelData;
    var name = req.body.name;
    var description = req.body.description;
    var id = short.generate();
    
    User.findOne({ _id: req.user._id }).then(data => {
        console.log(data);

        data.channels.push(id);
        data.save()
    })
    
    var newChannel = new channelData({
        readApiKey: short.generate(),
        writeApiKey: short.generate(),
        channelId: id,
        channelName:name,
        description:description
    });
    newChannel.save()
    
   res.redirect('/account');
    
    
    
})

router.get('/:id/:writeapikey', (req, res, next) => {
    var valueW = { time: time, value: [] }
    console.log(req.query);
    var x = req.query
    var array;
    var channelId = req.params.id;
    var writeApiKey = req.params.writeapikey;
    var time = moment().format();

    if (Object.keys(req.query).length > 7) {
        res.send('Invalid request')
    }
    for (i = 0; i < 7; i++) {
        var str = 'value' + i
        if (req.query[str]) {
            valueW.value.push({ field: str, fieldValue: req.query[str] })
        }
    }
    db.channelData.findOne({ channelId: channelId }).then(data => {
        //console.log(data)
        if (data.writeApiKey == writeApiKey) {
            //console.log(data)

            data.channelData.push(valueW)
            data.save()
            res.send('ok')


        }
        else {
            res.send('-1')
        }

    })
})

module.exports = router;