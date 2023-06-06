//  导入 axios
import axios from "axios"

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://localhost:3001/api"
})

// 设置 响应 和 请求 拦截器
instance.interceptors.request.use(config => {
  return config
})

instance.interceptors.response.use(response => {
  return response.data
})

// 导出 axios 实例
export default instance
