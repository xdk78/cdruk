import React from 'react'
import Footer from './components/footer'
import Menu from './components/menu'

function Index() {
  return (
    <div>
      <Menu />
      <section className="section">
        <div className="container">
          <h1 className="title">Section</h1>
          <h2 className="subtitle">
            A simple container to divide your page into{' '}
            <strong>sections</strong>, like the one you're currently reading
          </h2>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Index
