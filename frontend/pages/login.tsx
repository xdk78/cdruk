import React from 'react'
import Footer from './components/footer'
import Link from 'next/link'

function Login() {
  return (
    <div>
      <div className="selection">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">CDRUK</a>
          </Link>
        </div>
        <div className="container">
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div className="container">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success">Login</button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
