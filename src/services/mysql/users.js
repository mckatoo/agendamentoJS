const users = deps => {
  return {
    all: () => {
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
    save: (dados) => {
      let sql, acao;
      if (dados.id == null) {
        sql = 'insert into users (name, username, email, password, token) values (?)';
        acao = 'salvar';
        dados = [dados];
      } else {
        sql = 'UPDATE users SET name, username, email, password, token = ? WHERE id = ?';
        acao = 'atualizar';
        dados = [dados, dados.id];
      }
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        dados.token = Math.random().toString(36).substr(2);
        connection
          .query(sql, dados, (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao ${acao} o usuário ${dados.username}`, reject);
              return false;
            }
            resolve({ user: results.insertId });
          });
      });
    },
    del: () => {

    }
  };
};

module.exports = users;
