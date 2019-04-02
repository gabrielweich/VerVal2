import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyChart from '../../components/MyCharts/Chart3D';
import UploadCsv from '../../components/UploadCsv/UploadCsv';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import PDFButtonComponent from '../../components/PDFButtonComponent/PDFButtonComponent';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import AmostraBO from '../../utils/BO/AmostraBO';
import Alert from 'react-s-alert';
import styles from './Modal.css';

type Props = {};

export default class CounterPage extends Component<Props> {

  props: Props;

  state = {
    show: false,
    loading: false
  }

  showModal = () => {
    this.setState({ show: true });
    console.log(this.state)
  }

  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state)
  }

  showLoading = () =>{
    this.setState({ loading: true});
    console.log(this.state)
  }

  hideLoading = () =>{
    this.setState({ loading: false});
    console.log(this.state);
  }

  insereAmostras = (file) => {
    this.showLoading();
    if (file && file[0]) {
      AmostraBO.readCSV(file).then(
        result => {
          Alert.success(result + ' amostras inseridas.', {
            position: 'top',
            effect: 'stackslide',
            timeout: 5000
          });
          this.hideLoading();
          this.hideModal();
        },
        err => {
          if (err.type == 'INVALID CSV') {
            this.hideLoading();
            Alert.error("Dados no CSV em formato invalido", {
              position: 'top',
              effect: 'stackslide',
              timeout: 10000
            });
          } else {
            this.hideLoading();
            Alert.error('Amostras repetidas, log salvo em ' + err, {
              position: 'top',
              effect: 'stackslide',
              timeout: 10000
            });
          }
        }
      );
    } else {
      this.hideLoading();
      Alert.warning('Formato de arquivo invalido', {
        position: 'top',
        effect: 'stackslide',
        timeout: 5000
      });
    }
  }

  render() {
    return (
      <div align='center' className={styles.botaoAmostras}>
        <button type='button' className={styles.showmodal + ' ' + styles.grande} onClick={this.showModal}>Adicionar Amostras</button>
        <button type='button' className={styles.showmodal + ' ' + styles.pequeno} onClick={this.showModal}>+</button>
        <PDFButtonComponent></PDFButtonComponent>
        <div>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <LoadingComponent show={this.state.loading}></LoadingComponent>
            <UploadCsv acceptedFunction={this.insereAmostras} span={this.state.loading}/>
          </Modal>
        </div>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {

  return (
      <div align='center' className={(show ? styles.displayblock : styles.displaynone)}>
        <div className={styles.back} onClick={handleClose}>
          blur
        </div>
        <div className={styles.modalmain} onClick={handleClose}>
          <div>
            {children}
          </div>
          <button className={styles.closeModalButton} onClick={handleClose}>
          Fechar
        </button>
      </div>

    </div>
  );
};
