import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import dynamic from 'next/dynamic'
import { fetchMerchants } from '../store'

interface Merchant {
  id?: number
  email?: string
  name?: string
  location?: string
  description?: string
}

function Index() {
  const Map: any = dynamic(() => import('../components/map') as any, { ssr: false })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMerchants())
  }, [])
  const merchants = useSelector(
    (state: { merchants: Merchant[] }) => state.merchants
  )

  return (
    <>
      <link rel="stylesheet" href="//unpkg.com/leaflet@1.6.0/dist/leaflet.css"/>
      <Navbar/>
      <div className="main columns is-gapless">
        <div className="column has-background-white" style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 160px)' }}>
          {merchants && merchants.map(merchant => {
            return (
              <div key={merchant.id} className="box">
                <span>{merchant.name}</span><br/>
                <span><a href={'mailto:' + merchant.email}>{merchant.email}</a></span><br/>
                <span>{merchant.description}</span>
              </div>
            )
          })}
        </div>
        <div className="column is-three-quarters">
          {merchants && (
            <Map merchants={merchants}/>
          )}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Index
