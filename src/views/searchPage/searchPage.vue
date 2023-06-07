<template>
  <div class="searchPage">
    <!-- 搜索页头部 -->
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <!-- 搜索关键词 -->
    <ul v-if="false" class="search-list-box">
      <li
        v-for="item in 8"
        :key="item">
        <span>{{ item }}</span>
        <span>{{ item }}</span>
      </li>
    </ul>
    <!-- 最近搜索 -->
    <div :class="{ 'hidden': false,'box': true, 'search-history-box': true }">
      <div class="top">
        <p>最近搜索</p>
        <van-icon name="delete-o" />
      </div>
      <ul class="bottom">
        <li v-for="item in 10" :key="item">111</li>
      </ul>
    </div>
    <!-- 热门搜索 -->
    <div class="box search-hot-box">
      <div class="top">
        <p>热门搜索</p>
        <p @click="changeState=!changeState">{{ changeState ? "隐藏" : "显示" }}</p>
      </div>
      <div class="bottom">
        <ul v-if="changeState" >
          <li          
          v-for="item in hotSearchWords" 
          :key="item.num">
          {{ item.keyword || '暂无' }}
        </li>
        </ul>
        <p v-else>
          已隐藏搜索发现
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { hotWords } from '@/apis/goods';
// 定义热词接口
interface Props {
  num:number
  keyword:string
}
// 定义
interface goodsInfo{
  code:string
  message:string
}
// 存储搜索热词
const hotSearchWords = ref<Array<Props>>([])

// 搜索 与 隐藏 状态切换
const changeState = ref<boolean>(true)

// 获取 搜索热词
const getHotWords = async() => {
  const res = await hotWords()
  // console.log(res);
  if((res as unknown as goodsInfo).code !== "200") return
  hotSearchWords.value = res.data
  console.log(hotSearchWords.value);
}

// 挂载
onMounted( () => {
  getHotWords()
})
</script>

<style lang="scss" scoped>
.searchPage {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  padding-top: 30px;
  background-color: #fff;
  position: relative;

  > .search-list-box {
    width: 100%;
    position: absolute;
    left: 0;
    background-color: #fff;
    z-index: 999;
    margin: -30px -10px 0;

    > li {
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      height: 20px;

      :last-child {
        font-size: 12px;
        padding: 5px 10px;
        background-color: #F0F2F5;
        color: #686868;
      }
    }
  }

  > .box {
    width: 100%;
    margin-bottom: 20px;
    &.hidden {
      display: none;
    }

    > .top {
      display: flex;
      justify-content: space-between;
      height: 20px;
      align-items: center;

      p:last-child {
        font-size: 14px;
        color: #666;
      }
    }

    > .bottom {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding-top: 10px;

      > ul {
        display: flex;
        flex-wrap: wrap;
      }

      li {
        padding: 5px 10px;
        background-color: #F0F2F5;
        color: #686868;
        font-size: 12px;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      > p {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #ccc;
        width: 100%;
      }
    }
  }
}
</style>