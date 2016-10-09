var express = require('express');
var router = express.Router();

/* GET apis listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource!!');
});

router.use('/users', require('./users'));


module.exports = router;
