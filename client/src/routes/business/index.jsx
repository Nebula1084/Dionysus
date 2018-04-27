import React from 'react';
import { connect } from 'dva';
import Portal from '../../components/portal'


const stops = [1, 10, 20, 50, 100, 180, 256];

class Business extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.dispatch = dispatch;
  }

  componentDidMount() {
    this.dispatch({ type: 'portal/getStars' });
    this.dispatch({ type: 'portal/getNumbers' });
    this.dispatch({ type: 'portal/getBusiness' });
    this.dispatch({ type: 'portal/getAttributes' });
    this.dispatch({ type: 'portal/getHours' });
    this.dispatch({ type: 'portal/getNumbersCategory' });
  }

  which(value) {
    for (let i = 0; i < stops.length; i++) {
      if (value < stops[i])
        return i;
    }
    return stops.length - 1;
  }

  normalize(colorMap) {
    let self = this;
    if (colorMap) {
      let ret = {}
      let max = 0;
      let value;

      Object.keys(colorMap).forEach(function (key) {
        value = colorMap[key];
        if (max < value && key != 'TOTAL')
          max = value;
      });
      Object.keys(colorMap).forEach(function (key) {
        ret[key] = self.which(Math.sqrt(colorMap[key] / max) * 255);
      });
      return ret;
    }
  }

  render() {

    let numbers = this.normalize(this.props.portal.numbers);

    return (
      <div>
        <Portal
          colorMap={numbers}
          elevationMap={this.props.portal.stars}
          dispatch={this.dispatch}
          portal={this.props.portal}
        />
      </div>
    )
  }
}

export default connect(({ portal }) => ({ portal }))(Business);
