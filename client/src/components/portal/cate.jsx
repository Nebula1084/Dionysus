import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Category extends React.Component {

  render() {
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
        data: ['Resturants', 'Shopping', 'Beauty & Spas', 'Home Services', 'Nightlife', 'Health & Medical', 'Fashion', 'Automotive', 'Active Life']
      },
      series: [
        {
          name: 'Percentage',
          type: 'bar',
          data: [19000, 13200, 11000, 7000, 6200, 5000, 3200, 2900, 1700]
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