import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component {

  render() {
    let map = this.props.data
    if (map == undefined) {
      map = {}
    }
    let indicators = [];

    const reStyle = {
      width: '100%',
      height: '300px'
    }

    let max = 0;
    let state = 'TOTAL';

    Object.keys(map).forEach(function (key) {
      if (max < map[key]) {
        max = map[key];
      }
    });
    let values = [];
    Object.keys(map).forEach(function (key) {
      indicators.push({ name: key, max: max });
      values.push(map[key]);
    });

    if (indicators.length == 0) {
      return 0;
    }

    const sdoption = {
      title: {
        text: 'Business Attributes',
        left: 'center'
      },
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: indicators
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: values
          }
        ]
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