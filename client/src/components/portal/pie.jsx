import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component {

  render() {
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
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            { value: 535, name: 'Restaurant Delivery' },
            { value: 834, name: 'Business Accept Credit Card' },
            { value: 935, name: 'Open 24 Hours' },
            { value: 770, name: 'Alcohol' },
            { value: 473, name: 'Smoking' },
            { value: 225, name: 'WiFi' },
            { value: 655, name: 'Outdoor Seating' },
          ],
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