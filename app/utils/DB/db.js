var mysql = require('mysql');

const Connection = {
  getConnection : () => {

    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "senha",
      database: "rastreamento"
    });

    return con
  }
}

export default Connection;
