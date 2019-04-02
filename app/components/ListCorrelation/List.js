import React, { Component } from 'react';
import styles from './ListCorrelation.css';

export default class List extends Component<Props> {
  props: Props;

  limitaCasas(item) {
    let num = parseFloat(item)
    return num.toFixed(4)
  }


  render() {
    return (
      <div>
        <ul className={styles.ul}>
          {this.props.items.map(item => (
            <li className={styles.li} key={item}>
              {item[0]}: {this.limitaCasas(item[1])}%
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
