import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Line extends React.Component {

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
      height: '300px',
      margin: '10px'
    }

    const sdoption = {
      title: {
        text: 'Check-in Number',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: xSeries
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value, index) {
            if (value > 1000) {
              return value / 1000 + 'k'
            }
            else {
              return value;
            }
          }

        }
      },
      series: [{
        data: ySeries,
        type: 'line'
      }]
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