import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'

axios.defaults.baseURL = BASE_URL

export default (endpoint: string, config: AxiosRequestConfig) =>
  axios(endpoint, Object.assign({ withCredentials: true }, config))
