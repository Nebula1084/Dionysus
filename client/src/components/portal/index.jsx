import React from 'react';
import { Table, Button, Icon, Row, Col, Form, FormItem, Popconfirm, Select, Switch } from 'antd';

import Pie from './pie'
import Bar from './bar'
import Cate from './cate'
import Map from './map'

import styles from './portal.less';
import { getStars, getNumbers, getStarsCategory, getNumbersCategory } from '../../services/rest'

const stops = {
  0: [100, 100, 100],
  1: [0, 255, 0],
  2: [50, 200, 0],
  3: [100, 150, 0],
  4: [150, 100, 0],
  5: [200, 50, 0],
  6: [255, 0, 0]
}

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
  }

  updateMethod = (value) => {
    this.props.dispatch({ type: 'portal/updateMethod', payload: value });
  }

  updateCategory = (value) => {
    this.props.dispatch({ type: 'portal/updateCategory', payload: value });

    this.props.dispatch({ type: 'portal/getStars' });
    this.props.dispatch({ type: 'portal/getNumbers' });
    this.props.dispatch({ type: 'portal/getBusiness' });
    this.props.dispatch({ type: 'portal/getAttributes' });
    this.props.dispatch({ type: 'portal/getHours' });
  }

  updateState = (target) => {
    this.props.dispatch({ type: 'portal/updateState', payload: target });
    this.props.dispatch({ type: 'portal/getAttributes' });
    this.props.dispatch({ type: 'portal/getHours' });
    this.props.dispatch({ type: 'portal/getNumbersCategory' });
  }

  geoToolTip = (object) => {
    let number = this.props.portal.numbers[object.properties.statecode];
    if (!this.props.portal.numbers)
      return null;
    if (!this.props.portal.stars)
      return null;
    let star = this.props.portal.stars[object.properties.statecode];
    if (!number)
      number = 0;
    if (!star)
      star = 0;

    return (
      <div>
        {object.properties.name} <br />
        Business number:{number} <br />
        Average star:{star.toFixed(3)}
      </div>
    )
  }

  hexToolTip = (object) => {
    let number = object.elevationValue;
    let star = object.colorValue;
    return (
      <div>
        Business number:{number} <br />
        Average star:{star.toFixed(3)}
      </div>
    )
  }

  render() {
    this.props.portal.numbers;
    this.props.portal.stars;

    let stateData = {
      colorMap: this.props.colorMap,
      elevationMap: this.props.portal.numbers
    }

    return (
      <div>
        <Row>
          <Col span={18}>
            <div className={styles['showcase-toolbar']}>
              <Form layout="inline">
                <Form.Item>
                  <Select defaultValue={this.props.portal.method} className={styles['tool-button']} onChange={this.updateMethod}>
                    <Select.Option value='state'>State</Select.Option>
                    <Select.Option value='business'>Business</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Select defaultValue={this.props.portal.category} className={styles['tool-button']} onChange={this.updateCategory} >
                    <Select.Option value='all'>All</Select.Option>
                    <Select.Option value='Nightlife'>Nightlife</Select.Option>
                    <Select.Option value='Fashion'>Fashion</Select.Option>
                    <Select.Option value='Food'>Food</Select.Option>
                    <Select.Option value='Automotive'>Automotive</Select.Option>
                    <Select.Option value='Home Services'>Home Services</Select.Option>
                    <Select.Option value='Shopping'>Shopping</Select.Option>
                    <Select.Option value='Bars'>Bars</Select.Option>
                    <Select.Option value='Local Services'>Local Services</Select.Option>
                    <Select.Option value='Event Planning & Services:'>Event Planning & Services</Select.Option>
                    <Select.Option value='Beauty & Spas'>Beauty & Spas</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className={styles['showcase-container']}>
              <Map
                stateData={stateData}
                businessData={this.props.portal.business}
                method={this.props.portal.method}
                portal={this.props.portal}
                stops={stops}
                elevationScale={5}
                hexToolTip={this.hexToolTip}
                geoToolTip={this.geoToolTip}
                updateState={this.updateState}
              />
            </div>
          </Col>
          <Col span={6}>
            <Pie data={this.props.portal.attributes} />
            <Bar data={this.props.portal.hours} />
            <Cate data={this.props.portal.numbersCategory} />
          </Col>
        </Row>
      </div>
    )
  }
}