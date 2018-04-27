import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Line extends React.Component {

  render() {
    const reStyle = {
      width: '100%',
      height: '300px'
    }

    const sdoption = {
      title: {
        text: 'Check-in Number',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1590, 1930, 1720],
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