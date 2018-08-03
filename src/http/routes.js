const db = require('../services/mysql');

const routes = (server) => {
  server.get('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().all());
      next();
    } catch (error) {
      res.send(error);
      next();
    }
  });

  server.post('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().save(req.params));
      next();
    } catch (error) {
      res.send(error);
      next();
    }
  });

  server.put('/api/users', async (req, res, next) => {
    try {
      res.send(await db.users().save(req.params));
      next();
    } catch (error) {
      res.send(error);
      next();
    }
  });
};

module.exports = routes;
