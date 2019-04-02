import React from 'react'
import MyChartContainer from '../../containers/MyEchartContainer/MyEchartContainer'
import ListContainer from '../../containers/ListaAmostras/ListaAmostrasContainer'
import styles from './MainPage.css'
import ListCorrelationContainer from '../../containers/ListCorrelationContainer/ListCorrelationContainer'
import PDFButtonComponent from '../../components/PDFButtonComponent/PDFButtonComponent';

type Props = {};

export default class MainPage extends React.Component<Props> {
  props: Props;

  constructor(props) {
      super(props);
      this.state = {
        renderCorrelation: false,
        amostraSelecionada: ''
    }
  }

  setAmostraSelecionada = (amostra) => {
    this.setState( () => ({amostraSelecionada: amostra}) )
    this.setRenderCorrelaction()
  }

  setRenderCorrelaction = () => {
      this.setState(prevState => ({
          renderCorrelation: !prevState.renderCorrelation}))
  }

  render() {    
    return (
      <div className={styles.container}>
            <div className={styles.leftContainer}>{this.state.renderCorrelation ? (
              <MyChartContainer amostra={this.state.amostraSelecionada}/>
            ) : (<MyChartContainer/>)}
            </div>
            <div className={styles.rightContainer}>{this.state.renderCorrelation ? (
              <div>
                <ListCorrelationContainer amostra={this.state.amostraSelecionada}/>
                <div align='center' className={styles.alignButtons}>
                  <button className={styles.button} onClick={this.setRenderCorrelaction}>
                      Voltar
                  </button>
                  <PDFButtonComponent></PDFButtonComponent>
                </div>
              </div>
            ) : (<ListContainer setAmostraSelecionada={this.setAmostraSelecionada} />)}
            </div>
      </div>

  )}
}
