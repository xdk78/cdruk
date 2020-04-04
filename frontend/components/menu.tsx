/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react'
import Link from 'next/link'

function Menu() {
  const [isActive, setisActive] = React.useState(false)

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a
            onClick={() => {
              setisActive(!isActive)
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        >
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">CDRUK</a>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/singup">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                </Link>
                <Link href="/login">
                  <a className="button is-light">Log in</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Menu
