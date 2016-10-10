var express = require('express');
var router = express.Router();
const Connection = require('../src/mysql_connection');
const connection = new Connection();
const wrap_promise = require('./../src/util').wrap_promise;
const fetch_keys = require('./../src/util').fetch_keys;
const simpleApi = require('../src/simple_api');


/* GET apis listing. */
router.get('/', function(req, res, next) {
  const limit = Number(req.query.limit) || 100;
  simpleApi.selectApi(connection,
    "SELECT * FROM articles ORDER BY id DESC LIMIT ?", [limit],
    res, next
  );
});

router.post('/', function(req, res, next) {
  const obj = fetch_keys(req.body, ["author_id", "title", "content"]);
  simpleApi.insertApi(connection,
    "INSERT INTO articles(author_id, title, content) VALUES(?, ?, ?)",
    [obj["author_id"], obj["title"], obj["content"]],
    res, next
  );
});

router.get('/:article_id', function(req, res, next) { // 注意： limit の有無で処理が大きく変わる
  const article_id = req.params.article_id;
  if (req.query.limit) {
    const limit = Number(req.query.limit);
    const sql = "SELECT * FROM articles WHERE id <= ? ORDER BY id DESC LIMIT ?";
    simpleApi.selectApi(connection, sql, [article_id, limit], res, next);
  } else {
    const sql = "SELECT * FROM articles WHERE id = ?";
    simpleApi.selectApi(connection, sql, [article_id], res, next);
  }
});

router.patch('/:article_id', function(req, res, next) {
  const article_id = req.params.article_id;
  let values = [];
  let params = [];
  for (let k of ["author_id", "title", "content"]) {
    if (req.body[k]) {
      values.push(`${k} = ?`);
      params.push(req.body[k]);
    }
  }
  if (params.length > 0) {
    const value = values.join(", ");
    params.push(article_id);
    const sql = `UPDATE articles SET ${value} WHERE id = ?`;
    simpleApi.updateApi(connection, sql, params, res, next);
  } else {
    res.send(400);
  }
});

router.delete('/:article_id', function(req, res, next) {
  const article_id = req.params.article_id;
  const sql = "DELETE FROM articles WHERE id = ?";
  simpleApi.deleteApi(connection, sql, [article_id], res, next);
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
