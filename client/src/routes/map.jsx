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
const colorScale = r => [r * 255, 140, r, 100];
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

  _onClick(event) {
    if (event) {
      if (this.target) {
        this.target.selected = false;
      }
      this.target = event.object.properties;
      this.target.selected = true;
      this.setState({ ...this.state })
    }
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
        preventStyleDiffing={false}>

        <DeckGL {...viewport}
          layers={[
            new GeoJsonLayer({
              id: 'geojson',
              data,
              stroked: false,
              filled: true,
              extruded: true,
              onClick: this._onClick,
              wireframe: true,
              fp64: true,
              pickable: true,
              updateTriggers: {
                all: this.target
              },
              getElevation: f => f.properties.density * 10,
              getFillColor: f => {
                let r = f.properties.density;
                if (f.properties.selected)
                  return [255, r, 255, 100];
                else
                  return [255, 255, r, 100];
              },

              lightSettings: LIGHT_SETTINGS,
            })
          ]}
        />

      </MapGL>
    );
  }
}