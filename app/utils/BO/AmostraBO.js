import AmostraDAO from '../DB/DAO/AmostraDAO';
import { element } from 'prop-types';
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

const AmostraBO = {
  readCSV: file => {
    return new Promise((resolve, error) => {
      var stream = fs.createReadStream(file[0].path);
      let result = [];
      var csvStream = csv()
        .on('data', function(data) {
          data.forEach((element, index) => {
            if (!result[index]) {
              result[index] = [];
            }
            if (data[0] != '' && index >= 1) {
              result[index].push(parseFloat(element.replace(',', '.')));
            } else result[index].push(element);
          });
        })
        .on('end', function() {
          result.splice(0, 1);
          result.forEach(element => {
            element.splice(2, 1);
            var d = new Date();
            element.push(d);
          });
          AmostraBO.insert(result).then(
            result => {resolve(result)},
            err => {
              error(err);
            }
          );
        });
      stream.pipe(csvStream);
    });
  },

  insert: amostra => {
    return new Promise((resolve, error) => {
      AmostraDAO.getIdsData().then(result => {
        var aux = '';
        var errorList = [];
        var results = result.map((value,index,array) =>{
            return value.id;
        });
        amostra.forEach(element => {
          if (results.includes(element[0])){ 
            errorList.push(element[0]);
          }
        });
        if (errorList.length > 0) {
          let textError = 'Amostras já existentes:\n';
          errorList.forEach(element => {
            textError = textError.concat(element + '\n');
          });
          const dir = 'log';
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          let date = new Date()
            .toISOString()
            .replace(/T/, '_')
            .replace(/\..+/, '')
            .replace(/:/g,"-");
          const p = 'AmostrasRepetidas_' + date + '.txt';
          let f = path.join(dir,p);
          console.log(f);
          const file = fs.writeFileSync(f, textError, err => {
            if (err) throw err;
          });
          error(f);
        } else {
          AmostraDAO.insert(amostra).then(
            result => {resolve(result)},
            err => {
              error(err);
            }
          );
        }
      });
    });
  },

  getAmostras: () => {
    return AmostraDAO.getIdsData().then(result => {
      return result;
    });
  }
};

export default AmostraBO;