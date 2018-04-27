import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component {

  render() {
    let map = this.props.data
    if (map == undefined) {
      map = {}
    }
    let series = []
    Object.keys(map).forEach(function (key) {
      series.push({ value: map[key], name: key });
    });
    const reStyle = {
      width: '100%',
      height: '300px'
    }

    const sdoption = {
      title: {
        text: 'Business Attributes',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: series,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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