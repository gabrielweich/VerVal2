import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import 'echarts';
import ReactEcharts from 'echarts-for-react';
import kmeans  from '../../utils/kmeans';
import styles from './MyChart.css';



export default class Chart2Dp2p3 extends PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      series:
        {
          name: '2D',
          type: 'scatter',
          data: this.props.list,
          dimensions: ['P1','P2','P3','ID'],
          encode: {
            x: 'P2',
            y: 'P3',
            id: 'ID'
          },
      },
      symbolSize: 2.5,
      series_test:{
        name: '2D',
        type: 'effectScatter',
        rippleEffect: {
            brushType: 'stroke'
        },
        itemStyle: {
          color: '0000ff',
          borderWidth: 0.3,
          borderColor: 'rgba(255,255,255,0.8)'
        },
        data: '00',
        dimensions: ['P1','P2','P3','ID'],
        encode: {
          x: 'P2',
          y: 'P3',
          id: 'ID'
        },
      }
    };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const seriesU = this.state.series;
    this.setState({
      series: seriesU
    });
  }

  removeElementFromList(id) {
    var series = [this.state.series, this.state.series_test];
    var minhaAmostra = 0;

    for(let i = 0; i<this.props.list.length; i++){
      if(this.props.list[i][3][0] == id){
        minhaAmostra = i
        break;
      }
    }
    series[1].data = [this.props.list[minhaAmostra]];

    series[0].data = this.props.list;

    return series;
  }

  getOption = () =>  (
    this.props.amostra==undefined ? 
    ({
    grid: {},
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
      trigger: 'item',
      enterable: true
     },
    dataset: {
        source: this.props.list
      },
    series: this.state.series
    }) : ({
    grid: {},
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
      trigger: 'item',
      enterable: true
     },
    series: this.removeElementFromList(this.props.amostra)
    })
  )

  render() {
    return (
      <div className={styles.opa2D}>
        <div className={styles.backButton} data-tid="backButton" />
        <div className={styles.parent}>
          <ReactEcharts
            option={this.getOption()}
            lazyUpdate
            style={{ height: '100%' }}
          />
        </div>
      </div>
    );
  }
}
