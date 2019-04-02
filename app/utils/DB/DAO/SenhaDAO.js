import Connection from './../db';

const Senha = {

    getSenha: (callback) => {
        return new Promise((resolve, error) => {

          const con = Connection.getConnection();   
          let r = "erro";
          con.connect(function(err) {
            if(err) {throw err;}
            
            var $query = 'SELECT senha from usuarios';
  
            con.query($query, function(err, result, fields) {
              if(err) {
                throw err;
              }
              r = result[0].senha;
              resolve(r);
              
            }).on('error', err => {
              console.log(err);
            }).on('end', () => {
              con.destroy();
            });
          });

        });
        
    }   
}

export default Senha;