import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:4000'

axios.defaults.baseURL = BASE_URL

export default (endpoint: string, config: AxiosRequestConfig) =>
  axios(endpoint, Object.assign({ withCredentials: true }, config))
