<template>
  <div class="detailPage">
    <!-- 头部 -->
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <!-- 轮播商品 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image
          :src="goodsDetailInfo.img1"
        />
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          :src="goodsDetailInfo.img2"
        />
      </van-swipe-item><van-swipe-item>
        <van-image
          :src="goodsDetailInfo.img3"
        />
      </van-swipe-item><van-swipe-item>
        <van-image
          :src="goodsDetailInfo.img4"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 价格条 -->
    <div class="price_box">
      <p>
        ￥{{ (goodsDetailInfo.originprice*goodsDetailInfo.discount/10).toFixed(2) }}
        <span>起</span>
      </p>
      <p>
        <s>￥{{ goodsDetailInfo.originprice }}</s>
        <span>{{ goodsDetailInfo.discount }}折</span>
      </p>
    </div>
    <!-- 商品名称 -->
    <div class="name-box">
      <div>
        <van-tag color="#f688a4" plain>商家自营</van-tag>
        {{ goodsDetailInfo.proname}}
      </div>
    </div>
    <!-- 底部 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="cartHandler"/>
      <van-action-bar-button color="#f688a4" type="warning" text="加入购物车" @click="addCartHandler" />
      <van-action-bar-button color="#f03867" type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getDetailList } from '@/apis/goods';
import { addGoods } from "@/apis/cart"
import { showFailToast, showSuccessToast } from 'vant';
import HeaderComponent from '@/components/HeaderComponent.vue';

const $route = useRoute();
const $router = useRouter();
const user_id = window.localStorage.getItem("user_id")
const token = window.localStorage.getItem("token")

// 定义
interface goodsInfo {
  code:string
  message:string
}

interface detailInfo {
  originprice:number,
  [props:string]:any
}

// 存储 id 变量
const id = $route.query.id
// 存储商品的详情数据
const goodsDetailInfo = ref<detailInfo>({
  originprice:0
})
// 存储加入购物车的信息
const addGoodsInfo = ref({
  userid: window.localStorage.getItem("User_id"),
  proid: id,
  num:1
})

// 获取详情数据
const getDetail = async() => {
  const res = await getDetailList(id as string)
  if((res as unknown as goodsInfo).code !== "200") return
  console.log(res);
  goodsDetailInfo.value = res.data
}

// 跳转购物车
const cartHandler = () => {
  if(!user_id || !token) {
    showFailToast("您还没有登录, 即将去往登录")
    return $router.push("/login")
  }
  $router.push({path:"/cart",query:{user_id}})
}

// 加入购物车
const addCartHandler = async() => {
  console.log("加入购物车");
  const res = await addGoods(addGoodsInfo.value)
  if((res as unknown as goodsInfo).code !== "200") return
  console.log(res);
  showSuccessToast("成功加入购物车")
}

onMounted( ()=>{ 
  getDetail()
} )

</script>

<style lang="scss" scoped>
  .my-swipe .van-swipe-item {
    height:650px
  }
  .price_box {
    height: 200px;
    background-color: #f7225b;
    padding: 20px;
    color: white;
    box-sizing: border-box;
    p {
      margin: 20px;
    }
    p:nth-child(1) {
      font-size: 40px;
      span {
        font-size: 16px;
      }
    }
    p:nth-child(2) {
      font-size: 14px;
      width: 150px;
      display: flex;
      justify-content: space-between;
    }
  }
  .name-box {
    padding: 30px;
  }

</style>