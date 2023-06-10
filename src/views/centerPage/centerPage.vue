<template>
  <div class="home-page">
    <van-sticky>
      <!-- 个人中心头部 -->
      <Teleport to="header">
        <header-component></header-component>
      </Teleport>
      <!-- 头像框 -->
      <div class="avatar-box">
        <van-image
          round
          width="100px"
          height="100px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"/>
        <p>{{ userName }}</p>
      </div>
      <!-- 功能导航栏 -->
      <van-grid :column-num="3" class="grid-box">
        <van-grid-item 
          v-for="item in navBarData" 
          :key="item.id" 
          :icon="item.icon" 
          :text="item.title" />
      </van-grid>
    </van-sticky>
    
    <!-- 功能列表 -->
    <div class="nav-box" v-for="item in navListData" :key="item.id">
      <span>{{ item.title }}</span>
      <van-icon name="arrow" />
    </div>
    <!-- 退出登录 -->
    <van-button 
      color="#de3d96"
      class="logout-button" 
      block
      @click="logoutHandler">
      退出登录
    </van-button>
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()

// 存储用户名变量
const userName = window.localStorage.getItem("username") || "请您登录"

// 功能导航栏接口
interface Props{
  id:number
  title:string
  icon?:string
}

// 功能导航栏数据
const navBarData = ref<Array<Props>>([
  {id:1,title:"待付款",icon:"pending-payment"},
  {id:2,title:"待收货",icon:"send-gift-o"},
  {id:3,title:"全部订单",icon:"orders-o"},
])

// 功能列表栏数据
const navListData = ref<Array<Props>>([
  {id:1,title:"我的收藏"},
  {id:2,title:"购物车历史"},
  {id:3,title:"浏览历史"},
  {id:4,title:"申请退还"},
  {id:5,title:"零钱"},
  {id:6,title:"唯品花"},
  {id:7,title:"优惠券"},
  {id:8,title:"我的唯品币"},
  {id:9,title:"收货地址"},
  {id:10,title:"修改登录密码"},
  {id:11,title:"管理支付密码"},
  {id:12,title:"绑定手机"},
  {id:13,title:"实名认证"},
  {id:14,title:"我的银行卡"},
  {id:15,title:"注销账户"},
  {id:16,title:"个性化推荐"},
  {id:17,title:"程序化广告设置"},
  {id:18,title:"隐私政策"},
])

// 退出登录
const logoutHandler = () => {
  window.localStorage.removeItem("token")
  window.localStorage.removeItem("user_id")
  window.localStorage.setItem("is_login",JSON.stringify("false"))
  $router.push("/home")
}

</script>

<style lang="scss" scoped>
.avatar-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://img2.baidu.com/it/u=34933945,2081064043&fm=253&fmt=auto&app=138&f=JPEG?w=831&h=500") no-repeat;
  background-size: cover;
  color: aliceblue;
  p {
    height: 40px;
  }
}
.grid-box{
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(128, 128, 128,0.5);
}
.nav-box{
  height: 100px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  color: gray;
  border-top: 1px solid rgba(128, 128, 128,0.5);
}
.logout-button{
  margin: 20px 0;
}
</style>