import React, { Component } from 'react';
import ListCorrelation from '../../components/ListCorrelation/ListCorrelation';
import CounterContainer from '../Counter/CounterContainer.js';

type Props = {};

export default class ListaAmostrasContainer extends Component<Props> {

  render() {
    return (
      <div>
        <ListCorrelation amostra = {this.props.amostra}></ListCorrelation>
      </div>
    );
  }
}
