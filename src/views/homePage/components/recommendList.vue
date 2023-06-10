<template>
  <div class="content-box">
    <!-- 推荐区 -->
    <p class="recommend-box"></p>
      <ul class="menu-box">
        <li v-for="item in recommendListData" :key="item" class="menu-img-box"      @click="getSearchListHandler(item.brand)">
          <img :src="item.img3" alt="">
          <p>￥ {{ item.originprice }}</p>
        </li>
      </ul>
    <!-- 热销区 -->
    <div class="hot-box">
      <ul>
        <li v-for="item in props.killsList" :key="item" @click="getSearchListHandler(item.proname)">
        <img :src="item.img1" alt="">
        </li>
      </ul>
    </div>
    <!-- 特卖区 -->
    <div class="specialSale-box">
      <ul>
        <li v-for="item in recommendListData" :key="item"  @click="getSearchListHandler(item.brand)">
         <img :src="item.img4" alt="">
         <b>{{ item.category }}</b>
         <span>{{ item.originprice }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useRouter } from "vue-router";

const props = defineProps(['killsList','recommendListData'])
const $router = useRouter();

const getSearchListHandler = (text:string) => {
  $router.push({path:"/list",query:{text}})
}

</script>

<style lang="scss" scoped>
.content-box{
  .recommend-box{
  background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/05/165/1685956047312_750x165_90.png") no-repeat;
  background-size: cover;
  height: 160px;
  margin-top: 5px;
  margin-bottom: 0;
  width: 100%;
  }
  .menu-box{
      background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/06/70/1686014300747_750x310_90.png") no-repeat;
      background-size: cover;
      width: 100%;
      height: 270px;
      margin-top: 0;
      margin-bottom: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      >.menu-img-box{
        background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/06/18/1686014231558_217x278_90.png") no-repeat;
        background-size: cover;
        width: 22%;
        height: 200px;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img{
          width: 120px;
          height: 150px;
          background-color: green;
        }
        p{
          margin: -2px;
          font-size: 14px;
          color: white;
        }
      }
      > li:nth-child(2){
          transform: scale(1.3);
        }
  }
  .hot-box{
    background:url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/05/71/1685956596202_750x407_90.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
    overflow: hidden;
    > ul {
      width: 95%;
      margin: 0 auto;
      margin-top: 93px;
      height:255px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;

      > li {
        width: 102px;
        height: 102px;
        border-radius: 50%;
        margin: 0 20px;
        text-align: center;
        line-height: 102px;
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .specialSale-box {
    width: 100%;
    margin: 0 auto;
    height: 350px;
    margin-bottom: 20px;
    border-radius: 20px;
    background: url("https://h2.appsimg.com/b.appsimg.com/upload/momin/2023/06/02/168/1685694785827_750x366_90.png") no-repeat;
    background-size: cover;
    overflow: hidden;
    ul {
      width: 95%;
      height: 270px;
      background-color: #e7e2fe;
      margin: 86px auto 0;
      display: flex;
      justify-content:space-around;
      align-items: center;
      li {
        width: 21%;
        height: 200px;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img{
          width: 130px;
          height: 150px;
        }
        span{
          margin: 5px auto;
          font-size: 12px;
          color: red;
        }
        b{
          font-size: 14px;
          margin-bottom: 4px;
        }
      }
    }
  }


}
</style>