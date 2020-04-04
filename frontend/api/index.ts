import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'https://localhost:4000'

axios.defaults.baseURL = BASE_URL

export default (endpoint: string, config: AxiosRequestConfig) =>
  axios(endpoint, config)
