import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },

  error => {
    // do something with request error
    console.log('request: ' + error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      console.log('接口请求失败')
    }

    return response	// 传到store里
  },

  error => {
    // 接口请求失败页面初始化
    console.log('err: ' + error)

    return Promise.reject(error)
  }
)

export default service
