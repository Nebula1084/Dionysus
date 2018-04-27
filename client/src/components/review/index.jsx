import Map from '../portal/map'
import styles from '../portal/portal.less';
import { Table, Button, Icon, Row, Col, Form, FormItem, Popconfirm, Select, Switch } from 'antd';
import Line from './line'

const stops = {
  0: [234, 245, 245],
  1: [180, 0, 200],
  2: [200, 0, 150],
  3: [200, 150, 0],
  4: [150, 100, 100],
  5: [200, 200, 0],
  6: [255, 255, 0]
}

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 'state',
      category: 'all'
    };
  }

  updateState = (target) => {
    this.props.dispatch({ type: 'review/updateState', payload: target });
    this.props.dispatch({ type: 'review/getCheckIns' });
  }

  geoToolTip = (object) => {
    if (!this.props.review.reviews)
      return null;
    let checkIn = this.props.review.reviews[object.properties.statecode];
    if (!checkIn)
      checkIn = 0;

    return (
      <div>
        {object.properties.name} <br />
        Review number:{checkIn} <br />
      </div>
    )
  }


  render() {
    let stateData = {
      colorMap: this.props.colorMap,
      elevationMap: this.props.review.reviews
    }

    return (
      <div>
        <Row>
          <Col span={18} >

            <div className={styles['showcase-container']}>
              <Map
                stateData={stateData}
                method='state'
                businessData={undefined}
                portal={this.props.review}
                updateState={this.updateState}
                stops={stops}
                elevationScale={0.3}
                geoToolTip={this.geoToolTip}
              />
            </div>
          </Col>
          <Col span={6}>
            <Line data={this.props.review.checkIns} />
          </Col>
        </Row>
      </div>
    )
  }
}