//  导入 axios
import axios from "axios"
import { showFailToast } from "vant"

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://121.89.205.189:3000/api/"
})

// 创建接口数组
const list: Array<string> = [
  "user/info"
]

// 设置 响应 和 请求 拦截器
instance.interceptors.request.use(config => {
  if (list.includes(config.url || "")) {
    config.headers.token = window.localStorage.getItem("token")
  }
  return config
})

instance.interceptors.response.use(response => {
  if (response.data.sendMsgCode === "10019") {
    showFailToast("登录状态过期,请重新登录")
  }
  return response.data
})

// 导出 axios 实例
export default instance
