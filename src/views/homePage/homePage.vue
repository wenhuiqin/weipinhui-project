<template>
  <div class="home-page">
    <!-- 头部 -->
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      @focus="$router.push('/search')"
    />
    <!-- 分类滑动块 -->
    <van-tabs v-model:active="active" color="#de3d96" :swipeable="true" title-active-color="#de3d96" :ellipsis="false">
      <van-tab 
      v-for="item in cateList" 
      :title="item.title" 
      :key="item.id"
      class="tag-box">
      <div class="content-box">
        <p class="recommend-box"></p>
        <p class="menu-box">
          <van-image
            v-for="item in 3"
            class="menu-img-box"
            :key="item"
            width="33.33%"
            height="135px"
            fit="contain"
            src="https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/06/18/1686014231558_217x278_90.png"
          />
        </p>
        <div class="hot-box">
          <!-- <van-grid :column-num="5" class="hot-grid">
            <van-grid-item v-for="value in 10" :key="value" icon="photo-o" text="文字" class="hot-grid" />
          </van-grid> -->
          <div class="hot-menu">
            <span class="hot-grid" v-for="item in 10" :key="item">
              <img src="" alt="">
              <span class="text-box">文字</span>
              </span>
          </div>
        </div>
        <p class="list-box"></p>
      </div>
      </van-tab>
    </van-tabs>
    
    <!-- 内容 -->
    <goods-list></goods-list>
 
    <!-- 底部 -->
    <div class="footer">
      <RouterLink to="/cart" class="icon-box"><van-icon name="cart-o" /></RouterLink>
      <van-back-top class="icon-box" />
    </div>
  </div>
</template>

<script lang="ts" setup>

// 导入文件
import {ref} from "vue"
import HeaderComponent from '@/components/HeaderComponent.vue';
import goodsList from "./components/goodsList.vue"
import { RouterLink } from 'vue-router';

// 准备分类数据
const cateList = ref([
  {id:1,title:"推荐",link:"/home/recommend"},
  {id:2,title:"618年中特卖节",link:"/home/recommend"},
  {id:3,title:"3折疯抢",link:"/home/recommend"},
  {id:4,title:"唯品快抢",link:"/home/recommend"},
  {id:5,title:"国际",link:"/home/recommend"},
])

const active = ref<number>(0)
</script>

<style lang="scss" scoped>
.content-box{
  height: 415px;
  .recommend-box{
  background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/05/165/1685956047312_750x165_90.png") no-repeat;
  background-size: contain;
  height: 80px;
  margin-top: 5px;
  margin-bottom: 0;
}
  .menu-box{
    background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/06/70/1686014300747_750x310_90.png") no-repeat;
    background-size: cover;
    height: 150px;
    margin-top: -1px;
    margin-bottom: 0;
    >.menu-img-box{
      margin-top: 10px;
    }

  }
  .hot-box{
    background:url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/05/71/1685956596202_750x407_90.png") no-repeat;
    background-size:cover;
    height: 170px;
    width: 100%;
    margin-bottom: 0;
    margin-top: -1px;

    >.hot-menu{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      width: 90%;
      height: 100%;
      margin: 0 auto;
      >.hot-grid{
      width: 17%;
      height: 52px;
      margin:1px;
      margin-top: 34px;
      margin-bottom: 0;
      background-color: red;
      border-radius: 50%;
    }
    }
    
  }

}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  font-size: 30px;
  display: flex;
  text-align: center;
  line-height: 40px;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 30px;
  >.icon-box {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: white;
  }
}
</style>