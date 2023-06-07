<template>
  <div class="loginPage">
    <header-component title="登录"></header-component>
    <!-- logo -->
    <div class="top-box">
      <div class="center"></div>
    </div>
    <!-- 验证手机号 -->
    <van-form class="from-box">
      <van-cell-group inset v-if="loginState">
        <van-field
          v-model="mobile"
          name="pattern"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写完整的手机号', pattern}]"
        />
      </van-cell-group>
      <van-cell-group inset v-else>
        <van-field 
        v-model="loginInfo.loginname" 
        label="登录名" 
        placeholder="请输入手机号或邮箱"
        :rules="[{ required: true, message: '请填写正确的手机号或邮箱'}]"
         />
        <van-field 
        v-model="loginInfo.password" 
        label="密码" 
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写正确的密码'}]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button v-if="loginState" round block type="danger" native-type="submit" @click="sendMsgCodeHandler">
          获取验证码登录
        </van-button>
        <van-button v-else round block type="danger" native-type="submit" @click="submitHandler">
          登录
        </van-button>
      </div>
      <van-checkbox v-model="mobileChecked" shape="square" class="adjust-box">
        我已阅读并同意<a href="#">《唯品会服务条款》</a>、<a href="#">《唯品会隐私政策》</a>
      </van-checkbox>
      <div v-if="!loginState" class="forget-password adjust-box">忘记密码</div>
    </van-form>
    <van-divider>或</van-divider>

    <!-- 密码登录按钮 -->
    <van-button  class="login-button" round type="danger" @click="changeLoginState">
      {{ loginState?"密码登录":"手机号注册登录" }}
    </van-button>

    <!-- 验证码弹框 -->
    <van-dialog v-model:show="show" title="请输入验证码" show-cancel-button @confirm="submitCodeHandler">
      <van-cell-group inset>
        <van-field v-model="codeValue" placeholder="请输入验证码" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showFailToast,showSuccessToast,showNotify } from 'vant';
// 验证码验证
import { sendMsgCode,loginHandler } from "@/apis/users"
// 存储手机号变量
const mobile = ref<number>()
// 验证手机号码正则
const pattern = /^[1][3,4,5,7,8][0-9]{9}$/
// 存储复选框变量, 默认是 false
const mobileChecked = ref<boolean>(false)
// 存储验证码对话框变量
const show = ref(false);
// 存储返回的验证码
const returnCode = ref<string>()
// 存储用户输入的验证码变量
let codeValue = ref<string>()
// 存储切换 手机号登录 或 密码登录
const loginState = ref<boolean>(true)

const $router=useRouter()

// 定义接口
interface ResponseInfo {
  code: string
  message: string
}
interface Users {
  loginname: string,
  password: string
}
// 用户密码登录
const loginInfo = ref<Users>({
  loginname: "",
  password: ""
})
// 切换手机号登录 或 密码登录
const changeLoginState = () => {
  loginState.value = ! loginState.value
}
// 发送验证码
const sendMsgCodeHandler = async () => {
  // 必须 同意 服务协议
  if(!mobileChecked.value) return showFailToast("请阅读并同意服务协议")
  // 
  if(!pattern.test(mobile.value as unknown as string)) return
  const res = await sendMsgCode(mobile.value as unknown as number)
  if((res as unknown as ResponseInfo).code !== "200") return
  showFailToast((res as unknown as ResponseInfo).message)
  // 延迟 2秒 后显示弹框
  setTimeout( () => {
    show.value=true
  }, 2000)
  console.log(res);
  // 提示验证码
  showNotify({
    message: `您的验证码为${res.data}, 请查收`,
    color: '#fff',
    background: '#f02387',
    duration: 3000
  });
  returnCode.value=res.data
}

// 填写验证码
const submitCodeHandler = async () => {
  if(returnCode.value != codeValue.value){
    codeValue.value = ""
    return showFailToast("验证码输入错误,请重试")
  }
  // 因为缺少验证码登录接口, 这里使用默认的账号
  const userInfo = ref<Users>({ loginname: 'admin', password: '123456' })

  // 登录
  const res = await loginHandler(userInfo.value)
  if((res as unknown as ResponseInfo).code !== "200") return 
  console.log(res);
  showSuccessToast((res as unknown as ResponseInfo).message)
  
  // 把 token 和 id 存储到 localStorage
  window.localStorage.setItem('token', res.data.token)
  window.localStorage.setItem('user_id', res.data.userid)

  // 跳转到 首页
  setTimeout(() => {
    $router.push('/home')
  }, 1000)
}

// 密码登录
const submitHandler = async() => {
  if(!mobileChecked.value) return showFailToast("请阅读并同意服务协议")
  console.log(loginInfo.value);
  const res = await loginHandler(loginInfo.value)
  console.log(res);
  
  // 判断结果
  if ((res as unknown as ResponseInfo).code === '10011' || (res as unknown as ResponseInfo).code === '10010') {
    showFailToast((res as unknown as ResponseInfo).message)
    return
  }

  // 登录成功
  showSuccessToast((res as unknown as ResponseInfo).message)

  // 把 token 和 id 存储到 localStorage
  window.localStorage.setItem('token', res.data.token)
  window.localStorage.setItem('user_id', res.data.userid)

  // 跳转到 首页
  setTimeout(() => {
    $router.push('/home')
  }, 1000)
}

</script>

<style lang="scss" scoped>
.top-box{
  background: url("https://mlogin.vip.com/asserts/img/login_bg.3a93a8bf.jpg");
  width: 100%;
  height: 170px;
  position: relative;
  .center{
    background: url("https://mlogin.vip.com/asserts/img/logo.ac5608f4.png");
    background-size: contain;
    width: 125px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.from-box{
  padding-bottom: 50px;
}
.login-button{
  display: block;
  margin: 20px auto;
}
.forget-password{
  text-align: right;
}
.adjust-box {
  padding: 15px;
}
</style>