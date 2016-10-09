const express = require('express');
const router = express.Router();
const Connection = require('../src/mysql_connection');
const connection = new Connection();


/* GET apis listing. */
router.get('/', function(req, res, next) {
  connection.execute('SELECT * FROM users').then(([rows, _]) => {
    res.send(rows);
  });
});

router.post('/', function(req, res, next) {
  const name = req.body.name;
  if (!name) {
    res.err(400, "name is required");
  } else {
    connection.execute("INSERT INTO users(name) VALUES(?)", [name]).then(([info, _]) => {
      const user = {id: info.insertId, name: name};
      res.send(user);
    });
  }
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
