const sha1 = require('sha1');
const users = deps => {
    return {
        list: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select * from users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os usuários.', reject);
                        return false;
                    }
                    resolve({ users: results });
                });
            });
        },
        save: (name, username, email, password) => {
            let sql = 'insert into users (name, username, email, password, token) values (?,?,?,?,?)';
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection
                    .query(sql, [name, username, email, password], (error, results) => {
                        if (error || !results.affectedRows) {
                            errorHandler(error, `Falha ao salvar o usuário ${username}`, reject);
                            return false;
                        }
                        resolve({ user: { email, id: results.insertId } });
                    });
            });
        },
        update: (id, name, username, email, password, token) => {
            let sql = 'update users set name=?, username=?, email=?, password=?, token=?) where id=?';
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection
                    .query(sql, [name, username, email, password, token, id], (error, results) => {
                        if (error || !results.affectedRows) {
                            errorHandler(error, `Falha ao atualizar o usuário ${username}`, reject);
                            return false;
                        }
                        resolve({ user: { id }, affectedRows: results.affectedRows });
                    });
            });
        },
        delete: (resp) => {
            let sql = 'delete from users where id=?';
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection
                    .query(sql, resp.id, (error, results) => {
                        if (error) {
                            errorHandler(error, `Falha ao apagar o usuário com id = ${resp.id}`, reject);
                            return false;
                        }
                        resolve({ user: `Usuario ${resp.id} removido com sucesso.` });
                    });
            });
        }
    };
};

module.exports = users;
