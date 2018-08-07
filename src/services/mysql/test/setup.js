require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
    console.log(error);
    rejectFunction({error: msg});
};

module.exports = { connection, errorHandler };
