const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mckatoo',
    password: '',
    database: 'agendamento'
});

const errorHandler = (error, msg, rejectFunction) => {
    console.log(error);
    rejectFunction({ error: msg});
};

const usersModule = require('./users')({ connection, errorHandler });
const teachersModule = require('./teachers')({ connection, errorHandler });

module.exports = {
    users: () => usersModule,
    teachers: () => teachersModule,
};
