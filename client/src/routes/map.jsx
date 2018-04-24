import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer, ArcLayer } from 'deck.gl';
import Immutable from 'immutable';

/* global window */

// San Francisco
import data from '../assets/us-cdc.json';

const MAP_TOKEN = 'pk.eyJ1IjoiaGp3aXNzYWMiLCJhIjoiY2pnYWkyYmljNDd0czJ6bzZqejN4N2diOSJ9.qEjT8u_zenH1g7Fkh56FfA';
const colorScale = r => [r * 255, 140, 200 * (1 - r), 100];
const LIGHT_SETTINGS = {
  lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

export default class Example extends Component {

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

  _onChangeViewport(opt) {
    this.setState({ viewport: opt });
  }

  render() {
    const viewport = {
      ...this.state.viewport,
      ...this.props
    };
    return (
      <MapGL
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
        maxPitch={60}
        onViewportChange={this._onChangeViewport}
        // setting to `true` should cause the map to flicker because all sources
        // and layers need to be reloaded without diffing enabled.
        preventStyleDiffing={false}>
        <DeckGL {...viewport} layers={[
          new GeoJsonLayer({
            id: 'geojson',
            data,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            pickable: true,
            getElevation: f => Math.sqrt(f.properties.density) * 10,
            getFillColor: f => colorScale(f.properties.density),
            lightSettings: LIGHT_SETTINGS,
          }),

          new ArcLayer({
            data: [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.45669, 37.781] }],
            strokeWidth: 4,
            getSourceColor: x => [0, 0, 255],
            getTargetColor: x => [0, 255, 0]
          })
        ]}
        />

      </MapGL>
    );
  }
}