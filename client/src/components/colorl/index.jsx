import React from 'react';
import classNames from 'classnames/bind';
import styles from './colorl.less';

export default class ColorLegend extends React.Component {

  render() {
    const colorRange = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ];
    const colorRamp = colorRange.slice()
      .map(color => `rgb(${color.join(',')})`);

    return (
      <div style={{ height: 40, width: 200 }} >
        <div className={styles['layout']}>
          {colorRamp.map((c, i) => (
            <div key={i}
              className={styles['legend']}
              style={{ background: c, width: `${100 / colorRamp.length}%` }} />
          ))}
        </div>
        <p className={styles['layout']}>
          <span className={classNames(styles['col-1-2'])}>0</span>
          <span className={classNames(styles['col-1-2'], styles['text-right'])}>{this.props.max}</span>
        </p>
      </div>
    )
  }
}