import React from 'react'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

interface Merchant {
  id?: number
  email?: string
  name?: string
  location?: string
  description?: string
}

export default class Map extends React.Component<{ merchants: Merchant[] }, State> {
  state = {
    lat: 52.23,
    lng: 21.01,
    zoom: 11
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.merchants.map(merchant => {
          return (
            <Marker key={merchant.id} position={merchant.location.split(' ').map(x => parseFloat(x))}>
              <Popup>
                {merchant.name}<br/>
                {merchant.email}<br/>
                {merchant.description}
              </Popup>
            </Marker>
          )
        })}
      </LeafletMap>
    )
  }
}