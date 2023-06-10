<template>
  <!-- 底部 -->
  <div class="footer">
    <div @click="pushHandler" class="icon-box">
      <van-icon name="cart-o" />
    </div>
    <van-back-top class="icon-box" />
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';

const $router = useRouter()

const pushHandler = () => {
  const token = window.localStorage.getItem("token")
  const id = window.localStorage.getItem("user_id")
  if(!token || !id) {
    showFailToast("您还没有登录,即将跳转至登录页")
    return setTimeout(()=>{
      $router.push("/login") 
    },2000)
  }
  $router.push("/cart")
}

</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  font-size: 50px;
  display: flex;
  text-align: center;
  line-height: 80px;
  justify-content: space-between;
  padding: 0 60px;
  box-sizing: border-box;
  margin-bottom: 120px;
  >.icon-box {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    color: white;
  }
}
</style>