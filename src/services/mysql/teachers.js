const teachers = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection } = deps;
                connection.query('select * from teachers', (error, results) => {
                    if(error) {
                        reject(error);
                    }
                    resolve({ teachers: results });
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

module.exports = teachers;
