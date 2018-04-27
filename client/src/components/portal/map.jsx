import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer, HexagonLayer } from 'deck.gl';
import Immutable from 'immutable';

/* global window */

// San Francisco
import geoData from '../../assets/us-cdc.json';

const MAP_TOKEN = 'pk.eyJ1IjoiaGp3aXNzYWMiLCJhIjoiY2pnYWkyYmljNDd0czJ6bzZqejN4N2diOSJ9.qEjT8u_zenH1g7Fkh56FfA';
const colorScale = r => [r * 255, 140, r, 100];
const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
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
        all: [this.target, this.props.method, this.props.portal.update],
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
        if (this.props.stateData.colorMap) {
          r = this.props.stateData.colorMap[f.properties.statecode];
          if (r === undefined)
            r = 0;
        } else {
          r = 0;
        }
        if (f.properties.selected)
          return [100, r, r];
        else {
          return this.props.stops[r];
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
      getColorValue: points => 5,
      elevationDomain: [0, 50],
      // getElevationValue: this.getElevationValue,
      elevationUpperPercentile: 100,
      elevationLowerPercentile: 0,
      radius: 1000
    })
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
    );
  }
}