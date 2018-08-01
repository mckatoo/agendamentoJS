const db = require('../services/mysql');

const routes = (server) => {
  server.get('/api/users', (req, res, next) => {
    db.users().all()
      .then(dados => {
        res.send(dados);
        next();
      })
      .catch(error => console.log(error));
  });

  server.post('/api/users', (req, res, next) => {
    res.send(req.params);
    next();
  });
};


// server.put('users', (req, res, next) => {
//   res.send()
//   next();
// });

// server.delete('users', (req, res, next) => {
//   res.send()
//   next();
// });

module.exports = routes;
