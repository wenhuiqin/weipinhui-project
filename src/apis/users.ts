import instance from "@/utils/http";

// 发送验证码
export const sendMsgCode = (moblie: number) => instance.post("user/dosendmsgcode", { tel: moblie })

// 准备一个用户登录信息的接口
interface Users {
  loginname: string
  password: string
}

// 登录
export const loginHandler = (params: Users) => instance.post("user/login", params)

// 获取用户信息
export const getUserInfo = (id: string) => instance.get('user/info', { params: { userid: id } })