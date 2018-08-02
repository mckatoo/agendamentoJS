const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  methods: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
});

module.exports = cors;
