const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select * from users', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os usuários.', reject)
                        return false;
                    }
                    resolve({ users: results });
                });
            });
        },
        save: (dados) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                dados.token = Math.random().toString(36).substr(2);
                connection
                    .query('insert into users (name, username, email, password, token) values (?)', [dados], (error, results) => {
                        if (error) {
                            errorHandler(error, `Falha ao salvar o usuário ${dados.username}`, reject)
                            return false;
                        }
                        resolve({ user: results.insertId });
                    });
            });
        },
        update: () => {

        },
        del: () => {

        }
    };
};

module.exports = users;
