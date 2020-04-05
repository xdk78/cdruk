import React from 'react'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class SimpleExample extends React.Component<{}, State> {
  state = {
    lat: 52.196667,
    lng: 19.356389,
    zoom: 6
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    )
  }
}