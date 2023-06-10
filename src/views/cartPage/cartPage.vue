<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component title="购物车"></header-component>
    </Teleport>

    <!-- 购物车列表 -->
    <div class="cartList">
    <!-- 购物车为空 -->
    <div v-if="!cartInfoList" class="tip-box">
      <!-- 不指定单位，默认为 px -->
      <van-empty image-size="80" description="购物车空空如也, 快去挑选吧~" />
      <div class="tip-button"> 
        <van-button round type="success" @click="$router.push('/home')">
          马上抢购
        </van-button>
        <van-button round type="success">查看收藏好货</van-button>
      </div>
    </div>

    <!-- 购物车非空 -->  
    <div 
      class="goods-item"
      v-for="item in cartInfoList"
      :key="item.cartid">     
        <div class="checkbox" @click.stop>
          <van-checkbox v-model="item.flag" @change="changeSelectoneHandler(item.cartid,item.flag)"></van-checkbox>
        </div>
        <van-swipe-cell>
          <van-card
            class="van-card"
            :num="item.num"
            :price="(item.originprice*item.discount/10).toFixed(2)"
            title="商品标题"
            centered
            :thumb="item.img1">
            <template #title>
              <a class="click-box" @click="detailCheckHandler(item.proid)">
                点击查看商品详情
              </a>
            </template>
            <template #num>
              数量:{{ item.num > 0 ? item.num : 0 }}
            </template>
            <template #desc>
              <div class="text-box">
                <van-text-ellipsis
                  rows="2"
                  :content="item.proname"
                  expand-text="查看详情"/>
              </div>
            </template>
            <template #tags>
              <van-tag plain type="primary">七天无理由退货</van-tag>
              <van-tag plain type="primary">正品</van-tag>
            </template>
            <template #footer>
              <van-stepper v-model="item.num" />
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" color="#ea1bca" class="delete-button" @click="deleteGoodsHandler(item.cartid)" />
          </template>
        </van-swipe-cell> 
      </div>
    </div>
    <!-- 提交订单 -->
    <van-submit-bar :price="priceAll" button-text="提交订单" />
  </div>
</template>

<script lang="ts" setup>

import headerComponent from '@/components/HeaderComponent.vue';
import { getCart,deleteGoods,changeSelectone} from "@/apis/cart"
import { useRoute,useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
const $route = useRoute()
const $router = useRouter()

interface cartInfo {
  code:string
  message:string
}

interface cartProps {
  cartid:string,
  [props:string]:any
}

// 存储user_id
const user_id = $route.query.user_id

// 存储购物车数据
const cartInfoList = ref<Array<cartProps>>([])
console.log(cartInfoList);

// 获取购物车数据
const getCartList = async() => {
  const res = await getCart(user_id as string)
  if((res as unknown as cartInfo).code !== "200") return
  cartInfoList.value = res.data
  console.log(res);
  console.log(cartInfoList.value);
}

// 查看详情页
const detailCheckHandler = (id:string) => {
  $router.push({path:'/detail',query:{id}})
}

// 删除单条购物车
const deleteGoodsHandler = async(cartid:string) => {
  console.log("删除数据");
  const res = await deleteGoods(cartid)
  if((res as unknown as cartInfo).code !== "200") return
  console.log(res);
  // 重新获取数据
  getCartList()
}

// 修改选中状态
// 修改一条信息的选中状态
const changeSelectoneHandler = async (cartid: string, flag: boolean) => {
  const res = await changeSelectone(cartid, flag)
  console.log(res);
}

const priceAll = computed<number>(() => {
    return cartInfoList.value.reduce((prev, item) => {
    if (item.flag) {
      return prev + item.num * item.originprice
    } else {
      return prev
    }
  }, 0) * 100
})

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
  height: 350px;
  .tip-button{
    display: flex;
    justify-content: space-around;
  }
}
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.goods-item{
  background-color: #fff;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  
  .checkbox{
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-card{
  background-color: #fff;
  flex: 1;
  .text-box {
    width: 350px;
  }
  .click-box {
    color: #ea1bca;
  }
 }
}

</style>