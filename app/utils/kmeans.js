import {clustering} from 'echarts-stat';
import 'echarts-gl';

const kmeans = () => {
    var result = clustering.hierarchicalKMeans(data, 6, false);
    console.log(result);
    var series = [];
    var clusterAssment = result.clusterAssment;
    var centroids = result.centroids;
    var ptsInCluster = result.pointsInCluster;
    var i = 0;
    for (i; i < 6; i++) {
        series.push({
            name: 'scatter' + i,
            type: 'scatter',
            data: ptsInCluster[i],
            markPoint: {
                symbol: 'pin',
                symbolSize: 29,
                label: {
                    show: false,
                    emphasis: {
                        show: true,
                        position: 'top',
                        formatter: function (params) {
                            return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                                Math.round(params.data.coord[1] * 100) / 100 + ' ';
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                itemStyle: {
                    opacity: 0.7
                },
                data: [{
                    coord: centroids[i]
                }]
            }
        })
    }
    console.log(series);
    return series;
}

export {kmeans}