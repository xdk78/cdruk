import React from 'react'
import Footer from '../components/footer'
import Link from 'next/link'
import Model from '../components/model'

function Models() {
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
              {[1, 2, 3].map((el) => (
                <div key={el} className="list-item">
                  <div className="card">
                    <Model />
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">John Smith</p>
                          <p className="subtitle is-6">@johnsmith</p>
                        </div>
                      </div>

                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Models
