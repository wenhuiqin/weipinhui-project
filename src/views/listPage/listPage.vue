<template>
  <div class="listPage">
    <!-- 头部 -->
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <!-- 搜索框 -->
    <van-search
      shape="round"
      :placeholder="keyword || '请输入搜索关键词'"
      @focus="$router.push('/search')" />
    <!-- 筛选框 -->
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
    <!-- 列表渲染 -->
    <div class="list-box">
      <van-list
        class="ul"
        v-model:loading="loading"
        :finished="is_finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell v-for="item in listData" :key="item.proid" class="li" @click="getDetailHandler(item.proid)">
            <img :src="item.img1" alt="">
            <div>
              <p>
                <span>特卖价</span>
                <span>￥{{ (item.originprice*item.discount/10).toFixed(2) }}</span>
                <s>￥{{ item.originprice }}</s>
                <span>{{item.discount}}折</span>
                <span>60天历史低价</span>
              </p>
              <van-text-ellipsis
                  class="text-box"
                  rows="1"
                  :content="item.proname"
                  expand-text="展开"
                  collapse-text="收起" />
              <p>优惠券</p>
            </div>
        </van-cell>
      </van-list>
    </div>
    <!-- 底部 -->
    <footer-box></footer-box>
  </div>
</template>

<script lang="ts" setup>
import { onMounted,ref,watch } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import footerBox from '../homePage/components/footerBox.vue';
// 获取 搜索 的列表数据
import { useRoute, useRouter } from 'vue-router';
import { getSearchList } from '@/apis/goods';

const $route = useRoute()
const $router = useRouter()

console.log($route.query);
// 存储 搜索关键词
const keyword = $route.query.text as string
console.log(keyword);
// 开关变量
const flag = ref<boolean>(true)
// 存储当前页
const count = ref<number>(1)
// 数据是否结束
const is_finished = ref<boolean>(false)
const loading = ref<boolean>(false);

// 定义接口
interface ListProps {
  proid:string
  img1:string
  originprice:number
  proname:string
  discount:number
}

// 获取列表
const listData = ref<Array<ListProps>>([])
console.log(listData);

// 发送请求获取列表数据
const getList = async () => {
  const res = await getSearchList(count.value,keyword as string)
  // console.log(keyword);
  // console.log(res);
  if(!res.data){
    is_finished.value = true
    return
  }
  listData.value.push(...res.data)
  flag.value = true
  loading.value = false
}

// onload
const onLoad = () => {
  console.log("我触发了");
  if(!flag.value) return
  flag.value = false
  count.value ++
}

// 获取详情页
const getDetailHandler = (id:string) => {
  console.log("获取详情页",id);
  $router.push({path:"/detail",query:{id}})
}

// 侦听 count
watch(count,()=>getList())

// 挂载
onMounted(()=>{
  getList()
})

</script>

<style lang="scss" scoped>
.list-box {
  background-color: #f3f4f5;
  .ul{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    .li{
    width: 45%;
    height: 650px;
    margin-top: 30px;
    border-radius: 20px;
    margin: 30px 17px 0 17px;
    img {
      width: 100%;
      height: 350px;
      background-color: red;
    }
    div {
      padding: 10px;
      background-color: #fff;
      margin-top: -6px;
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
          font-size: 28px;
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
      .text-box{
        font-size: 14px;
        margin: 0;
        color: gray;
        text-align: left;
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