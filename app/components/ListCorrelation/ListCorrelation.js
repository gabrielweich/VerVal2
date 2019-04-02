import React, { Component } from 'react';
import List from './List';
import styles from './ListCorrelation.css';
import EuclideanBO from '../../utils/BO/EuclideanBO';

export default class FilteredList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      initialItems: [[]],
      items: [[]],
      percentState: 80
    };

    this.getCorrelations(this.state.percentState);

  }

  getCorrelations = (percent) => {
    EuclideanBO.getAllCorrelationByPercentual(this.props.amostra, percent).then(result =>{
      this.setState({initialItems:[]});
      var amostras = [[]];
      var array = result;
      array.forEach(element => {
        amostras.push(element);
        this.state.initialItems.push(element);
      });
      this.state.initialItems.shift();
      this.state.initialItems.shift();
      this.setState({items:this.state.initialItems});
    });
  }

  componentWillMount() {
    this.setState({ items: this.state.initialItems });
  }

  handleChange = (e) => {
    this.setState({percentState: e.target.value})
  }

  render() {
    return (
      <div className={styles['mount-point']}>
        <div className={styles.body}>
          <div align='center'>
          <h1>{this.props.amostra}</h1>
          
            <input 
              className={styles['input']} 
              onChange={this.handleChange.bind(this)}
              placeholder="Correlação Desejada"
            />
          
          <button className={styles['button']} onClick={() => this.getCorrelations(this.state.percentState)}>Salvar</button>
          </div>
          <div>
            <List items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}
