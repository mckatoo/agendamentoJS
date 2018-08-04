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
    save: (resp) => {
      let sql, acao, resposta;
      let dados = [resp.name, resp.username, resp.email, resp.password, Math.random().toString(36).substr(2)];
      if (!resp.id) {
        sql = 'insert into users (name, username, email, password, token) values (?,?,?,?,?)';
        acao = 'salvar';
      } else {
        sql = 'UPDATE users SET name=?, username=?, password=?, token=? WHERE id=?';
        acao = 'atualizar';
        dados.splice(2, 1);
        dados[4] = resp.id;
        resposta = dados;
      }
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        connection
          .query(sql, dados, (error, results) => {
            if (error || !results.affectedRows) {
              errorHandler(error, `Falha ao ${acao} o usuário ${dados.username}`, reject);
              return false;
            }
            if (!resposta) {
              resposta = results.insertId;
            }
            resolve({ user: resposta, affectedRows: results.affectedRows });
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
