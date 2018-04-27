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
    this.state = {
      method: 'state',
      category: 'all'
    };
  }

  updateMethod = (value) => {
    this.setState({ ...this.state, method: value });
  }

  updateCategory = (value) => {
    this.props.dispatch({ type: 'portal/getStars', payload: value });
    this.props.dispatch({ type: 'portal/getNumbers', payload: value });
    this.props.dispatch({ type: 'portal/getBusiness', payload: value });
  }

  render() {

    let stateData = {
      colorMap: this.props.colorMap,
      elevationMap: this.props.elevationMap
    }

    return (
      <div>
        <Row>
          <Col span={18}>
            <div className={styles['showcase-toolbar']}>
              <Form layout="inline">
                <Form.Item>
                  <Select defaultValue={this.state.method} className={styles['tool-button']} onChange={this.updateMethod}>
                    <Select.Option value='state'>State</Select.Option>
                    <Select.Option value='business'>Business</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Select defaultValue={this.state.category} className={styles['tool-button']} onChange={this.updateCategory} >
                    <Select.Option value='all'>All</Select.Option>
                    <Select.Option value='Nightlife'>Nightlife</Select.Option>
                    <Select.Option value='Fashion'>Fashion</Select.Option>
                    <Select.Option value='Food'>Food</Select.Option>
                    <Select.Option value='Automotive'>Automotive</Select.Option>
                    <Select.Option value='Home Services'>Home Services</Select.Option>
                    <Select.Option value='Shopping'>Shopping</Select.Option>
                    <Select.Option value='Bars'>Bars</Select.Option>
                    <Select.Option value='Local Services'>Local Services</Select.Option>
                    <Select.Option value='Event Planning & Services:'>Event Planning & Services:</Select.Option>
                    <Select.Option value='Beauty & Spas'>Beauty & Spas</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
            <div className={styles['showcase-container']}>
              <Map stateData={stateData} method={this.state.method} businessData={this.props.portal.business} portal={this.props.portal} stops={stops} />
            </div>
          </Col>
          <Col span={6}>
            <Pie />
            <Bar />
            <Cate />
          </Col>
        </Row>
      </div>
    )
  }
}