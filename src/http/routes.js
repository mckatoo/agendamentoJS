const db = require('../services/mysql');

const routes = (server) => {
    server.get('/api/users', async (req, res, next) => {
        try {
            res.send(await db.users().list());
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.post('/api/users', async (req, res, next) => {
        let par = req.params;
        try {
            res.send(
                await db.users().save(
                    par.id,
                    par.name,
                    par.username,
                    par.email,
                    par.password
                )
            );
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.put('/api/users', async (req, res, next) => {
        try {
            res.send(await db.users().save(req.params));
        } catch (error) {
            res.send(error);
        }
        next();
    });

    server.del('/api/users', async (req, res, next) => {
        try {
            res.send(await db.users().delete(req.params));
        } catch (error) {
            res.send(error);
        }
        next();
    });
};

module.exports = routes;
