const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error);
  rejectFunction({error: msg});
};

const usersModule = require('./users')({ connection, errorHandler });
const teachersModule = require('./teachers')({ connection, errorHandler });

module.exports = {
  users: () => usersModule,
  teachers: () => teachersModule
};
