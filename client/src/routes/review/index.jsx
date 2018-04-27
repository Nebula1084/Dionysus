import React from 'react';
import { connect } from 'dva';
import Review from '../../components/review'


const stops = [1, 10, 20, 50, 100, 180, 256];

class ReviewPortal extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.dispatch = dispatch;
  }

  componentDidMount() {
    this.dispatch({ type: 'review/getReviews' });
    this.dispatch({ type: 'review/getCheckIns' });
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
        ret[key] = self.which(colorMap[key] / max * 255);
      });
      return ret;
    }
  }

  render() {

    let numbers = this.normalize(this.props.review.reviews);

    return (
      <div>
        <Review colorMap={numbers} elevationMap={numbers} dispatch={this.dispatch} review={this.props.review} />
      </div>
    )
  }
}

export default connect(({ review }) => ({ review }))(ReviewPortal);
