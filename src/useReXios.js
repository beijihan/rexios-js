import axios from 'axios'

import reXiosCore from './core.js'
import validConfig from './valid.js'

export default function useReXios (reXiosConfig = {}) {
  if(!validConfig(reXiosConfig)) return
  axios.interceptors.response.use(response => response, (error) => reXiosCore(error, reXiosConfig))
}
