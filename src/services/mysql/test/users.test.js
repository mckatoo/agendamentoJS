import test from 'ava';
import { randomBytes } from 'crypto';
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

const users = require('../users')({ connection, errorHandler });

test('Criação de usuários', async t => {
    let random = Math.random().toString(36).substr(2);
    const data = [
        'nome' + random,
        'asldfjsdfj' + random,
        'asdfsd' + random + '@asdfd.com',
        'asdlfjsdf' + random
    ];
    const result = await users.save(data);
    console.log(result);
    console.log(data);
    t.is(result.user, data);
    t.pass();
});

// test('Lista de usuários', async t => {
//     const user = await users.list();
//     console.log(user);
//     t.pass();
// });
