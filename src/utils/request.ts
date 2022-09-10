import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    /* 请求拦截器 */
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('res', res)
        return res
      },
    )

    /* 请求拦截器 */
    this.instance.interceptors.response.use(
      (resp: AxiosResponse) => {
        console.log('resp', resp)
        return resp.data
      },
    )
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }
}

export default Request
