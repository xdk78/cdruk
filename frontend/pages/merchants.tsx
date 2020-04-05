import React, { useEffect } from 'react'
import Footer from '../components/footer'
import Link from 'next/link'
import { fetchMerchants } from '../store'
import { useDispatch, useSelector, connect } from 'react-redux'

type Merchant = {
  id?: number
  email?: string
  isMerchant?: boolean
  name?: string
  location?: string
}

function Merchants() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMerchants())
  }, [])
  const merchants = useSelector(
    (state: { merchants: Merchant[] }) => state.merchants
  )

  return (
    <div>
      <div className="selection">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">CDRUK</a>
          </Link>
        </div>
        <div className="selection">
          <div className="container">
            <div className="list">
              {merchants && merchants.length > 0 ? (
                merchants.map((el) => (
                  <div key={el.id} className="list-item">
                    <div className="card">
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-4">{el.name}</p>
                            <p className="subtitle is-6">{el.email}</p>
                          </div>
                        </div>

                        <div className="content">{el.location}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="title is-3">No merchants available</h1>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default connect()(Merchants)
