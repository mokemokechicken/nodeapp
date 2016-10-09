var express = require('express');
var router = express.Router();

/* GET apis listing. */
router.get('/', function(req, res, next) {
  res.send('GET articles/ !');
});

router.post('/', function(req, res, next) {
  res.send('POST articles/ !');
});

router.get('/:article_id', function(req, res, next) {
  res.send('GET article_id=' + req.params.article_id);
});

router.patch('/:article_id', function(req, res, next) {
  res.send('PATCH article_id=' + req.params.article_id);
});

router.delete('/:article_id', function(req, res, next) {
  res.send('DELETE article_id=' + req.params.article_id);
});


// Likes
router.get('/:article_id/likes', function(req, res, next) {
  res.send('GET Likes article_id=' + req.params.article_id);
});

router.put('/:article_id/likes/:user_id', function(req, res, next) {
  res.send('PUT article_id=' + req.params.article_id + ' user_id=' + req.params.user_id);
});

router.get('/:article_id/likes/:user_id', function(req, res, next) {
  res.send('GET article_id=' + req.params.article_id + ' user_id=' + req.params.user_id);
});

router.delete('/:article_id/likes/:user_id', function(req, res, next) {
  res.send('DELETE article_id=' + req.params.article_id + ' user_id=' + req.params.user_id);
});

module.exports = router;
