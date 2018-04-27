import Map from '../portal/map'
import styles from '../portal/portal.less';
import { Table, Button, Icon, Row, Col, Form, FormItem, Popconfirm, Select, Switch } from 'antd';
import Line from './line'
import ColorLegend from '../colorl'

const stops = {
  0: [100, 100, 100],
  1: [1, 152, 189],
  2: [73, 227, 206],
  3: [216, 254, 181],
  4: [254, 237, 177],
  5: [254, 173, 84],
  6: [209, 55, 78]
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
            <div className={styles['showcase-toolbar']}>
              <Form layout="inline">
                <Form.Item>
                  <ColorLegend />
                </Form.Item>
              </Form>
            </div>
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