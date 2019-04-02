import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UploadCsv from '../../components/UploadCsv/UploadCsv';
const csv = window.require('fast-csv');
const fs = window.require('fs');
type Props = {};

export default class CounterPage extends Component<Props> {
    props: Props;

    

    teste(file){
      var stream = fs.createReadStream(file[0].path);
      let result = [];
      var csvStream = csv()
      .on("data", function(data){
           data.forEach((element, index) => {
             if(!result[index]){
              result[index] = []
             }
             result[index].push(element)
           });
      })
      .on("end", function(){
        result.splice(0,1)
        result.splice(0,3)
        result.forEach(element => {
          console.log(JSON.stringify(element))
        })
      });


      stream.pipe(csvStream);

    }

    render() {
      return <UploadCsv acceptedFunction={this.teste} />;
    }
  }
