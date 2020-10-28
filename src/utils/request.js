// 请求模块
import axios from 'axios'
import store from '../store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
export default request
