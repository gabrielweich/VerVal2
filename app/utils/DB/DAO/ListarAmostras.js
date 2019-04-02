import Connection from "../db";

const ListarAmostras = {

  select: listarAmostras => new Promise((resolve) => {

    const con = Connection.getConnection();

    con.connect((err) => {
      if (err) { throw err; }

      console.log('Conectado ao banco!')

      const $queryListAll = 'select * from AMOSTRAS;'
      con.query($queryListAll, (err, result) => {
        if(err) {
          throw err;
        }
        resolve(result);
        console.log(result);
      }).on('error', err => {
        console.log(err);
      }).on('end', () => {
        con.destroy();
      });
    });
  })
}

export default ListarAmostras;
