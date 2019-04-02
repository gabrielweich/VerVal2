import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import 'echarts-gl';
import ReactEcharts from "echarts-for-react";
import {data} from './../utils/Data';
import { kmeans } from '../utils/kmeans';
import styles from './MyChart.css'

export default class TestChart extends PureComponent<Props> {
    props: Props;

    constructor(props){
        super(props);
        this.state = {series: [{
            type: 'scatter',
            data: data,
            hoverAnimation: true
        }] }
    }

    componentDidMount(){
        this.update();
    }

    update(){
        var seriesU = kmeans();
        this.setState({
            series: seriesU
        })
    }
    
    getOption = () => ({
        title: {
            text: "Teste",
            textStyle: {
                 color: '#D63715'
            }
        },
        grid: {},
        xAxis: {
            type: 'value'
            //min: 0
        },
        yAxis: {
            type: 'value'
            //min: 0
        },
        series: this.state.series,
        color : ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    });

    

    render() {
        return (
            <div className={styles.opa}>
                <div className={styles.parent}>
                    <ReactEcharts option={this.getOption()} style={{height:'100%'}}  />
                </div>
            </div>
        );
    }
}