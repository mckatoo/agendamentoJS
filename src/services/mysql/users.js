const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps;
                connection.query('select * from users', (error, results) => {
                    if(error) {
                        errorHandler(error, 'Falha ao listar os usuários.', reject)
                    }
                    resolve({ users: results });
                });
            });
        },
        save: () => {

        },
        update: () => {

        },
        del: () => {
            
        }
    };
};

module.exports = users;
