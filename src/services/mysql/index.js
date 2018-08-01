const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mckatoo',
    password: '',
    database: 'agendamento'
});

const usersModule = require('./users')({ connection });

module.exports = {
    users: () => usersModule
};
