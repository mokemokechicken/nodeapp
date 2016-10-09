var express = require('express');
var router = express.Router();

/* GET apis listing. */
router.get('/', function(req, res, next) {
  res.send('GET users/ !');
});

router.post('/', function(req, res, next) {
  res.send('POST users/ !');
});

router.get('/:user_id', function(req, res, next) {
  res.send('GET user_id=' + req.params.user_id);
});

router.patch('/:user_id', function(req, res, next) {
  res.send('PATCH user_id=' + req.params.user_id);
});

router.delete('/:user_id', function(req, res, next) {
  res.send('DELETE user_id=' + req.params.user_id);
});

module.exports = router;
