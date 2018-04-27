import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer, HexagonLayer } from 'deck.gl';
import Immutable from 'immutable';
import styles from './portal.less';

import geoData from '../../assets/us-cdc.json';

const MAP_TOKEN = 'pk.eyJ1IjoiaGp3aXNzYWMiLCJhIjoiY2pnYWkyYmljNDd0czJ6bzZqejN4N2diOSJ9.qEjT8u_zenH1g7Fkh56FfA';
const colorScale = r => [r * 255, 140, r, 100];
const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -72.8, 18.5, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.4,
  specularRatio: 0.1,
  lightsStrength: [1.0, 1.0, 1.0, 0.5],
  numberOfLights: 2
};

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 40,
        longitude: -90,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 1200,
        height: 800
      },
    };
    autobind(this);
  }

  _onClick(event) {
    this.props.updateState(event.object.properties);
  }

  _onChangeViewport(opt) {
    this.setState({ viewport: opt });
  }

  getElevationValue(points) {
    return 4;
  }

  clickLayer() {
    return new GeoJsonLayer({
      id: 'geojson',
      data: geoData,
      stroked: false,
      filled: true,
      extruded: false,
      onClick: this._onClick,
      wireframe: true,
      fp64: true,
      pickable: true,
      updateTriggers: {
        all: [this.props.portal.target, this.props.method, this.props.portal.update],
      },
      getFillColor: f => {
        if (f.properties.selected)
          return [100, 0, 0, 100];
        else {
          return [200, 200, 200, 100];
        }
      },
      lightSettings: LIGHT_SETTINGS,
    });
  }

  which(value) {
    let n = Object.keys(this.props.stops).length - 1;
    if (value) {
      return Math.ceil(value * n / 5)
    }
    return 0;
  }


  statsLayer() {
    return new GeoJsonLayer({
      id: 'geojson',
      data: geoData,
      stroked: false,
      filled: true,
      extruded: true,
      onClick: this._onClick,
      wireframe: true,
      fp64: true,
      pickable: true,
      onHover: this._onHover,
      elevationScale: this.props.elevationScale,
      updateTriggers: {
        all: [this.props.portal.target, this.props.method, this.props.portal.update]
      },
      getElevation: f => {
        if (this.props.stateData.elevationMap) {
          let r = this.props.stateData.elevationMap[f.properties.statecode];
          if (r) {
            return r;
          } else {
            return 0;
          }
        }
        return 0;
      },
      getFillColor: f => {
        let r = 0;
        if (this.props.portal.stars) {
          r = this.props.portal.stars[f.properties.statecode];
          if (r === undefined)
            r = 0;
        } else {
          r = 0;
        }
        if (f.properties.selected)
          return [100, r, r];
        else {
          return this.props.stops[this.which(r)];
        }
      },

      lightSettings: LIGHT_SETTINGS,
    });
  }

  businessLayer() {
    return new HexagonLayer({
      id: 'hexagon-layer',
      coverage: 1,
      data: this.props.portal.business,
      elevationRange: [0, 1000],
      elevationScale: 100,
      extruded: true,
      opacity: 1,
      fp64: true,
      getColorValue: points => {
        let stars = 0;
        for (let point of points) {
          stars += point.stars
        }
        if (points.length === 0)
          return 0
        else
          return stars / points.length;
      },
      elevationDomain: [0, 50],
      // getElevationValue: this.getElevationValue,
      elevationUpperPercentile: 100,
      elevationLowerPercentile: 0,
      colorRange: Object.values(this.props.stops),
      onHover: this._onHover,
      pickable: true,
      lightSettings: LIGHT_SETTINGS,
      radius: 1000
    })
  }

  _renderTooltip() {
    const { x, y, hoveredObject } = this.state;
    let renderMethod;
    if (this.props.method == 'state') {
      renderMethod = this.props.geoToolTip;
    } else {
      renderMethod = this.props.hexToolTip;
    }

    if (!hoveredObject || !renderMethod) {
      return null;
    }
    return (
      <div className={styles['tooltip']}
        style={{
          left: x, top: y + 30
        }}>
        {renderMethod(hoveredObject)}
      </div>
    );
  }

  _onHover({ x, y, object }) {
    this.setState({ ...this.state, x, y, hoveredObject: object });
  }

  render() {
    const viewport = {
      ...this.state.viewport,
      ...this.props
    };

    const layers = [];
    if (this.props.method == 'state') {
      layers.push(this.statsLayer());
    } else {
      layers.push(this.clickLayer());
      layers.push(this.businessLayer());
    }
    return (
      <div>
        {this._renderTooltip()}
        <MapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/light-v9'
          mapboxApiAccessToken={MAP_TOKEN}
          maxPitch={60}
          onViewportChange={this._onChangeViewport}
          preventStyleDiffing={false}>

          <DeckGL {...viewport}
            layers={layers}
          />

        </MapGL>
      </div>
    );
  }
}