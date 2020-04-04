import React from 'react'
import App from 'next/app'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import '../node_modules/bulma/bulma.sass'
import '../css/theme.scss'

class MyApp extends App<{ reduxStore }> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
