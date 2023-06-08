<template>
  <div class="listPage">
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      @focus="$router.push('/search')"
    />
    <van-grid direction="horizontal" :column-num="4">
      <van-grid-item>
        <span>价格</span>&emsp;
        <van-icon name="arrow-up" />
      </van-grid-item>
      <van-grid-item>
        <span>折扣</span>&emsp;
        <van-icon name="arrow-down" />
      </van-grid-item>
      <van-grid-item>
        <span>品牌</span>&emsp;
        <van-icon name="gem-o" />
      </van-grid-item>
      <van-grid-item>
        <span>筛选</span>&emsp;
        <van-icon name="filter-o" />
      </van-grid-item>
    </van-grid>
    <div class="list-box">
      <ul>
        <li v-for="item in 4" :key="item">
         <img src="" alt="">
         <div>
          <p>
            <span>特卖价</span>
            <span>￥156</span>
            <s>￥439</s>
            <span>3.6折</span>
            <span>60天历史低价</span>
          </p>
          <p>M1 |童装女鞋</p>
          <p>优惠券</p>
         </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
// 获取 搜索 的列表数据
import { useRoute } from 'vue-router';
import { getSearchList } from '@/apis/goods';

const $route = useRoute()
console.log($route.query);
// 存储 搜索关键词
const keyword = $route.query.keyword

// 发送请求获取列表数据
const getList =async()=>{
  const res = await getSearchList(keyword as string)
  console.log(keyword);
  console.log(res);
}

// 挂载
onMounted(()=>{
  getList()
})

</script>

<style lang="scss" scoped>
.list-box {
  background-color: #f3f4f5;
  ul{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow: hidden;
    li{
    width: 45%;
    height: 550px;
    margin-top: 30px;
    border-radius: 20px;
    img {
      width: 100%;
      height: 350px;
      background-color: red;
    }
    div {
      padding: 10px;
      background-color: #fff;
      p{
        margin: 0;
      };
      p:nth-child(1){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 12px;
        line-height: 40px;
        span:nth-child(1){
          text-align: center;
          line-height: 40px;
          color: #fff;
          width: 100px;
          background-color: #f73e71;
        }
        span:nth-child(2){
          font-size: 30px;
          font-weight: 700;
        }
        s{
          margin: 0 10px;
          color: gray;
        }
        span:nth-child(4){
          color: gray;
        }
        span:nth-child(5) {
          color: #f73e71;
        }
      }
      p:nth-child(2){
        font-size: 14px;
        margin: 5px 0;
        color: gray;
      }
      p:nth-child(3){
        font-size: 12px;
        color: #f73e71;
        width: 100px;
        height: 40px;
        background-color: #fde7ed;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  }
  
}
</style>