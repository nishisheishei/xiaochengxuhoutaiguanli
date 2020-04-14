import axios from  'axios'

// 基准路径
const request = axios.create({
    // baseURL: 'http://192.168.123.124:8083'
    baseURL: 'http://localhost:8083'
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // console.log(config)
    return config
  }, function (error) {
    return Promise.reject(error)
  })

// Add a response interceptor
request.interceptors.response.use((response) => {
    return response
  }, function (error) {
    return Promise.reject(error)
  })

export default request