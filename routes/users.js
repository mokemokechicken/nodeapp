const express = require('express');
const router = express.Router();
const Connection = require('../src/mysql_connection');
const connection = new Connection();
const wrap_promise = require('./util').wrap_promise;


router.get('/', function(req, res, next) {
  wrap_promise(next,
    connection.execute('SELECT * FROM users').then(([rows, _]) => {
      res.send(rows);
    })
  );
});


router.post('/', function(req, res, next) {
  const name = req.body.name;
  if (!name) {
    return res.send(400, "name is required");
  }
  wrap_promise(next,
    connection.execute("INSERT INTO users(name) VALUES(?)", [name]).then(([info, _]) => {
      const user = {id: info.insertId, name: name};
      res.send(201, user);
    })
  );
});


router.get('/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;

  wrap_promise(next,
    connection.execute("SELECT * FROM users WHERE id = ?", [user_id]).then(([rows, _]) => {
      if (rows.length == 0) {
        res.send(404);
      } else {
        res.send(rows[0]);
      }
    })
  );
});


router.patch('/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
  const name = req.body.name;
  if (!name) {
    return res.send(400, "name is required");
  }

  wrap_promise(next,
    connection.execute("UPDATE users SET name = ? WHERE id = ?", [name, user_id]).then(([info, _]) => {
      if (info.changedRows == 0) {
        res.send(404);
      } else {
        res.send(200);
      }
    })
  );
});


router.delete('/:user_id', function(req, res, next) {
  const user_id= req.params.user_id;

  wrap_promise(next,
    connection.execute("DELETE FROM users WHERE id = ?", [user_id]).then(([info, _]) => {
      if (info.affectedRows == 0) {
        res.send(404);
      } else {
        res.send(200);
      }
    })
  );
});

module.exports = router;
