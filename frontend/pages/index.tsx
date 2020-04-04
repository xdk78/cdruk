import React from 'react'
import Link from 'next/link'
import Footer from '../components/footer'
import Menu from '../components/menu'
import { connect } from 'react-redux'

function Index() {
  return (
    <div>
      <Menu />
      <section className="section">
        <div className="container">
          <h1 className="title is-3">cdruk</h1>
          <h2 className="subtitle is-4">
            Doctors around the world lack equipment. They need help so that they
            can help us.
          </h2>
          <p className="subtitle is-4 has-text-weight-semibold">
            Do you have a 3D printer?&nbsp;
            <Link href="/signup">
              <a className="button is-inline is-primary">Join us</a>
            </Link>
            &nbsp;and print equipment for nearby hospitals.
          </p>
          <p className="subtitle is-4 has-text-weight-semibold">
            Does your hospital lack equipment?&nbsp;
            <Link href="/signup">
              <a className="button is-inline is-primary is-light">
                Come to us here!
              </a>
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default connect()(Index)
