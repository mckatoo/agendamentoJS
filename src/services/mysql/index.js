const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mckatoo',
    password: '',
    database: 'agendamento'
});

const users = new Promise((resolve, reject) => {
    connection.query('select * from users', (error, results) => {
        if(error) {
            reject(error);
        }
        resolve({ users: results });
    })
});

module.exports = users;
