const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:8001', 'http://localhost'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

module.exports = cors;
