var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../db/authentification');

/* GET users listing. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;