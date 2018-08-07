import test from 'ava';
import { connection, errorHandler } from './setup';

let token = Math.random().toString(36).substr(2);
const users = require('../users')({ connection, errorHandler });
let userId = Number;
const create = () => users.save('nome' + token, 'asldfjsdfj' + token, token + '@asdfd.com', token);

test.beforeEach(t => connection.query('delete from users'));
test.after.always(t => connection.query('delete from users'));

test('Criação de usuários', async t => {
    const result = await create();
    userId = result.user.id;
    t.is(result.user.email, token + '@asdfd.com');
});

test('Atualizacão de usuários', async t => {
    await create();
    const updated = await users.update(userId, 'nome', 'username', 'senha');
    console.error(updated);
    t.is(updated.user.affectedRows, 1);
});

// test('Lista de usuários', async t => {
//     const user = await users.list();
//     console.log(user);
//     t.pass();
// });
