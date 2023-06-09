<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component title="购物车"></header-component>
    </Teleport>
    <!-- 购物车列表 -->
    <div class="cartList">
    <!-- 购物车为空 -->
    <div v-if="false" class="tip-box">
      <!-- 不指定单位，默认为 px -->
      <van-empty image-size="80" description="购物车空空如也, 快去挑选吧~" />
      <div class="tip-button"> 
        <van-button round type="success" @click="$router.push('/home')">马上抢购</van-button>
        <van-button round type="success">查看收藏好货</van-button>
      </div>
    </div>
    <!-- 购物车非空 -->
    <div class="goods-item" v-else v-for="item in 8" :key="item">
      <van-checkbox class="checkbox" >
        <van-card
          class="van-card"
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        >
          <template #tags>
            <van-tag plain type="primary">标签</van-tag>
            <van-tag plain type="primary">标签</van-tag>
          </template>
          <template #footer>
            <van-stepper v-model="value" />
          </template>
        </van-card>
      </van-checkbox>
      
    </div>
  </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="3050" button-text="提交订单" />
  </div>
</template>

<script lang="ts" setup>
import headerComponent from '@/components/HeaderComponent.vue';
import { getCart} from "@/apis/cart"
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const $route = useRoute()

interface cartInfo {
  code:string
  message:string
}

// 存储user_id
const user_id = $route.query.user_id
// 存储购物车数据
const cartInfoList =ref([])
const value = ref(1);
// 获取购物车数据
const getCartList = async() => {
  const res = await getCart(user_id as string)
  if((res as unknown as cartInfo).code !== "200") return
  cartInfoList.value = res.data
  console.log(res);
}

// 挂载
onMounted( () => {
  getCartList()
} )
</script>


<style lang="scss" scoped>
.cartList{
  background-color: #f3f4f5;
  width: 100%;
  overflow: hidden;
  height: 100%;

  .tip-box{
  width: 95%;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 10px;
  height: 250px;
  .tip-button{
    display: flex;
    justify-content: space-around;
  }
}
}
.goods-item{
  background-color: #fff;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  .van-card{
  width: 165%;
  background-color: #fff;
}
}</style>