const db = require('../services/mysql');

const routes = (server) => {
  server.get('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().all());
    } catch (error) {
      res.send(error);
    }
    next();
  });

  server.post('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().save(req.params));
    } catch (error) {
      res.send(error);
    }
    next();
  });

  server.put('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().update(req.params));
    } catch (error) {
      res.send(error);
    }
    next();
  });
};

module.exports = routes;
