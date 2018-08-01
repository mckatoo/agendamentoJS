const users = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection } = deps;
                connection.query('select * from users', (error, results) => {
                    if(error) {
                        reject(error);
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
