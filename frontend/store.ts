import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import api from './api'
import cookies from './lib/cookies'

const defaultState = {
  user: null,
  isLogged: false,
  errors: [],
  merchants: [],
  models: [],
}

export const actionTypes = {
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  SIGN_UP_PENDING: 'SIGN_UP_PENDING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_PENDING: 'LOGIN_PENDING',
  LOGOUT: 'LOGOUT',
  SET_TOKEN: 'SET_TOKEN',
  FETCH_MERCHANTS_PENDING: 'FETCH_MERCHANTS_PENDING',
  FETCH_MERCHANTS_SUCCESS: 'FETCH_MERCHANTS_SUCCESS',
  FETCH_MERCHANTS_ERROR: 'FETCH_MERCHANTS_ERROR',
  FETCH_MODELS_PENDING: 'FETCH_MODELS_PENDING',
  FETCH_MODELS_SUCCESS: 'FETCH_MODELS_SUCCESS',
  FETCH_MODELS_ERROR: 'FETCH_MODELS_ERROR',
  FETCH_CURRENT_USER_PENDING: 'FETCH_CURRENT_USER_PENDING',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_ERROR: 'FETCH_CURRENT_USER_ERROR',
}

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_SUCCESS:
      return { ...state, user: action.payload.user, isLogged: true }
    case actionTypes.SIGN_UP_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.SIGN_UP_ERROR:
      return { ...state, isLogged: false }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, user: action.payload.user, isLogged: true }
    case actionTypes.FETCH_CURRENT_USER_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.FETCH_CURRENT_USER_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, isLogged: true }
    case actionTypes.LOGIN_PENDING:
      return { ...state, isLogged: false }
    case actionTypes.LOGIN_ERROR:
      return { ...state, isLogged: false }
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        isLogged: true,
        user: { ...state.user, token: action.payload.user.token },
      }
    case actionTypes.LOGOUT:
      return { ...state, user: null, isLogged: false }

    case actionTypes.FETCH_MERCHANTS_SUCCESS:
      return { ...state, merchants: action.payload.merchants }
    case actionTypes.FETCH_MODELS_SUCCESS:
      return { ...state, merchants: action.payload.models }

    default:
      return state
  }
}

// ACTIONS
export const signup = (email: string, name: string, password: string) => async (
  dispatch
) => {
  try {
    dispatch({ type: actionTypes.SIGN_UP_PENDING })
    const { data } = await api.post('/register', {
      email,
      name,
      password,
    })

    cookies.set('token', data.data.token, {
      expires: 30, // one month
    })

    dispatch({
      type: actionTypes.SIGN_UP_SUCCESS,
      payload: { user: { email, name, token: data.data.token } },
    })
  } catch (error) {
    dispatch({ type: actionTypes.SIGN_UP_ERROR })
  }
}

export const login = (email: string, password: string) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_PENDING })
    const { data } = await api.post('/login', { email, password })

    cookies.set('token', data.data.token, {
      expires: 30, // one month
    })
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: { user: { email, token: data.data.token } },
    })
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_ERROR })
  }
}

export const logout = () => async (dispatch) => {
  cookies.destroy('token')
  dispatch({ type: actionTypes.LOGOUT })
}

export const setToken = (token: string) => async (dispatch) => {
  cookies.set('token', token, {
    expires: 30, // one month
  })
  dispatch({ type: actionTypes.SET_TOKEN, payload: { user: { token } } })
}

export const fetchMerchants = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.FETCH_MERCHANTS_PENDING })
    const { data } = await api.get('/merchants', {
      headers: {
        Authorization: `Bearer ${getState().initialState.user.token}`,
      },
    })

    dispatch({
      type: actionTypes.FETCH_MERCHANTS_SUCCESS,
      payload: { merchants: data.data },
    })
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_MERCHANTS_ERROR })
  }
}

export const fetchModels = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.FETCH_MODELS_PENDING })
    const { data } = await api.get('/models', {
      headers: {
        Authorization: `Bearer ${getState().initialState.user.token}`,
      },
    })

    dispatch({
      type: actionTypes.FETCH_MODELS_SUCCESS,
      payload: { models: data.data },
    })
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_MODELS_ERROR })
  }
}

export const fetchCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.FETCH_CURRENT_USER_PENDING })
    const { data } = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${getState().initialState.user.token}`,
      },
    })

    dispatch({
      type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
      payload: { user: data.data },
    })
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_CURRENT_USER_ERROR })
  }
}

export function initializeStore(initialState = defaultState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
