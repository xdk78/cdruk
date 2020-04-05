import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import dynamic from 'next/dynamic'

class Index extends React.Component<{}, {}> {
  render() {
    const Map: any = dynamic(() => import('../components/map') as any, { ssr: false });

    return (
      <>
        <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
        <Navbar/>
        <div className="main columns is-gapless">
          <div className="column has-background-white">
            @TODO merchants here
          </div>
          <div className="column is-three-quarters">
            <Map/>
          </div>
        </div>
        <Footer/>
      </>
    )
  }
}

export default connect()(Index)
