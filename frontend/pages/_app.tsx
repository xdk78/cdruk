import React from 'react'
import App from 'next/app'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import '../css/theme.scss'
import '../css/custom.scss'
import nookies from 'nookies'
import { setToken } from '../store'

class MyApp extends App<{ token: string; reduxStore }> {
  static async getInitialProps({ Component, ctx }) {
    const { token } = nookies.get(ctx)

    let loggedIn = false

    if (token) {
      // Set the token on the server side
      ctx.reduxStore.dispatch(setToken(token) as any)
      loggedIn = true
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps, token, loggedIn }
  }

  componentDidMount() {
    const { token, reduxStore } = this.props
    if (token) {
      // Set token on the client side too
      reduxStore.dispatch(setToken(token) as any)
    }
  }

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
