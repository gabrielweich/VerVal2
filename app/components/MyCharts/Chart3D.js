import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import 'echarts';
import ReactEcharts from 'echarts-for-react';
import kmeans  from '../../utils/kmeans';
import styles from './MyChart.css';



export default class Chart3D extends PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      series: 
      {
        name: '3D',
        type: 'scatter3D',
        data: this.props.list,
        symbolSize: 7,
        dimensions: [
          'P1',
          'P2',
          'P3',
          'ID',
        ],
        encode: {
                x: 'P1',
                y: 'P2',
                z: 'P3',
                id: 'ID'
        },
      },
      symbolSize: 7,
      series_test:{
        name: '3D',
        type: 'scatter3D',
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
          x: 'P1',
          y: 'P2',
          z: 'P3',
          id: 'ID'
        },
      }
    }
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
    grid3D: {},
    xAxis3D: [{
      type: 'value', gridIndex: 0, name: 'P1'
    }],
    yAxis3D: {
      type: 'value', gridIndex: 0, name: 'P2'
    },
    zAxis3D: {
      type: 'value', gridIndex: 0, name: 'P3'
    },
    tooltip: {
      trigger: 'item',
      enterable: true
    },
    series: this.state.series
    }) : ({
    grid3D: {},
    xAxis3D: [{
      type: 'value', gridIndex: 0, name: 'P1'
    }],
    yAxis3D: {
      type: 'value', gridIndex: 0, name: 'P2'
    },
    zAxis3D: {
      type: 'value', gridIndex: 0, name: 'P3'
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
      <div className={styles.opa3D}>
        <div className={styles.backButton} data-tid="backButton">
        </div>
        <div className={styles.parent}>
          <ReactEcharts option={this.getOption()} lazyUpdate={true}
                         style={{ height: '100%' }} />
        </div>
      </div>
    );
  }
}
