import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component {

  render() {
    let map = this.props.data
    if (map == undefined) {
      map = {}
    }
    let xSeries = []
    let ySeries = []
    Object.keys(map).forEach(function (key) {
      xSeries.push(key);
      ySeries.push(map[key]);
    });

    const reStyle = {
      width: '100%',
      height: '300px'
    }

    const sdoption = {
      color: ['#3398DB'],
      title: {
        text: 'Opening Hours',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xSeries,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct access',
          type: 'bar',
          barWidth: '60%',
          data: ySeries
        }
      ]
    };

    return (
      <div>
        <ReactEcharts
          option={sdoption}
          style={reStyle} />
      </div>
    )
  }
}