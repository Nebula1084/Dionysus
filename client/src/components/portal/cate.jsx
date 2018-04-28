import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Category extends React.Component {

  render() {
    let map = this.props.data
    if (map == undefined) {
      map = {}
    }
    let xSeries = []
    let ySeries = []
    Object.keys(map).forEach(function (key) {
      ySeries.push(key);
      xSeries.push(map[key]);
    });

    const reStyle = {
      width: '100%',
      height: '300px'
    }

    const sdoption = {
      title: {
        text: 'Category',
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
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ySeries
      },
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: xSeries
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