import React, { Component } from 'react';
import styles from './ReactFilteredList.css';

export default class List extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <ul className={styles.ul}>
          {this.props.itemsId.map(item => (
            <li className={styles.li} key={item.id} onClick={() => this.props.setAmostraSelecionada(item.id)} >
              {item.id} {item.data_entrada.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}