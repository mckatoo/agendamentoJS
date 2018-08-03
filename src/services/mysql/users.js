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
    save: (resp) => {
      let sql, acao, resposta;
      let dados = [resp.name, resp.username, resp.email, resp.password, Math.random().toString(36).substr(2)];
      if (!resp.id) {
        sql = 'insert into users (name, username, email, password, token) values (?,?,?,?,?)';
        acao = 'salvar';
      } else {
        sql = 'UPDATE users SET name=?, username=?, email=?, password=?, token=? WHERE id=?';
        acao = 'atualizar';
        dados[5] = resp.id;
        resposta = parseInt(resp.id);
      }
      return new Promise((resolve, reject) => {
        console.log('asldfj');
        const { connection, errorHandler } = deps;
        connection
          .query(sql, dados, (error, results) => {
            if (error) {
              errorHandler(error, `Falha ao ${acao} o usuário ${dados.username}`, reject);
              return false;
            }
            if (!resposta) {
              resposta = results.insertId;
            }
            resolve({ user: resposta });
          });
      });
    },
    del: () => {

    }
  };
};

module.exports = users;
