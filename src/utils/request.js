// 请求模块
import axios from 'axios'
import store from '../store'
import jsonBig from 'json-bigint'
// import vue from 'vue'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // tramsformResponse允许自定义原始的响应数据
  transformResponse: [function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {
        data
      }
    }
  }]
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

request.interceptors.response.use(config => {
  return config
}, function (error) {
  // debugger
  if (error.response.status === 401) {
    console.log(this)
  }
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
export default request
