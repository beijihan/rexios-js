import axios from 'axios'

let isRefreshing = false
let promise = ''

function replayAxios (config) {
  return new Promise(function (resolve, reject) {
    axios(config).then(res => resolve(res)).catch(err => reject(err))
  })
}

export default async function reXiosCore(error, reXiosConfig) {
  let { needReplay, replayFunction } = reXiosConfig
  if(needReplay(error) !== true) return error
  if(isRefreshing) return promise.then(res => {
    isRefreshing = false
    replayAxios(error.response.config).then(res => resolve(res))
  }).catch(err => {
    isRefreshing = false
  })

  isRefreshing = true
  // promise = replayFunction((resolve) => replayAxios(error.response.config).then(res => resolve(res)))
  let resolveFunc = ''
  promise = new Promise((resolve, reject) => {
    resolveFunc = resolve
  });
  await Promise.resolve(replayFunction());
  replayAxios(error.response.config).then(res => resolveFunc(res));
  return promise
}
