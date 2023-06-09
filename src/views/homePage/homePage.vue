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
    <!-- 分类列表 -->
    <van-tabs 
      v-model:active="active" color="#de3d96" swipeable title-active-color="#de3d96" :ellipsis="false" animated @click-tab="getBrand">
      <van-tab class="tag-box" v-for="item in cateList" :title="item" :key="item" >
        <!-- 推荐区 -->
        <recommend-list :killsList="killsList" :recommendListData="recommendListData"></recommend-list>
        <!-- 列表区 -->
        <goods-list :brandList="brandList"></goods-list>
      </van-tab>
    </van-tabs>

    <!-- 底部 -->
    <footer-box></footer-box>

  </div>
</template>

<script lang="ts" setup>

// 导入文件
import {ref, onMounted} from "vue"
import HeaderComponent from '@/components/HeaderComponent.vue';
import goodsList from "./components/goodsList.vue"
import recommendList from "./components/recommendList.vue";
import footerBox from "./components/footerBox.vue"
import { getCategorylist, getBrandList, getKillList, getRecommendList } from "@/apis/goods"

// 存储分类数据
const cateList = ref([])
// 存储当前选中的分类
let currentCate = ref<string>("手机")
// 存储品牌数据
const brandList = ref([])
// 存储秒杀列表
const killsList = ref([])
// 存储推荐列表
const recommendListData = ref([])
// 挂载后 渲染手机列表
const defaultBrand = ref<string>("手机")
// 默认 选中手机列表
const active = ref<number>(0)

// 定义接口
interface goodsInfo {
  code:string
  message:string
}

// 定义品牌列表接口
interface brandInfo {
  title?:string
}

// 获取分类列表
const getCateList = async () =>{
  const res = await getCategorylist()
  console.log(res);
  if((res as unknown as goodsInfo).code !== "200") return
  cateList.value = res.data
}

// 获取品牌列表
const getBrand = async (info:brandInfo) => {
  // 存储当前选中的分类
  currentCate.value = info.title as string
  const res = await getBrandList(info.title|| "手机")
  if((res as unknown as goodsInfo).code !== "200") return
  // 存储当前分类下的品牌列表
  brandList.value = res.data

}

// 获取秒杀列表
const killList = async() => {
  const res = await getKillList(10)
  if((res as unknown as goodsInfo).code !== "200") return
  killsList.value = res.data
}

// 获取推荐列表
const recommendData = async () => {
  const res = await getRecommendList(3)
  if((res as unknown as goodsInfo).code !== "200") return
  console.log(res);
  recommendListData.value = res.data
}


onMounted( () => {
  getCateList()
  getBrand(defaultBrand as unknown as brandInfo )
  killList()
  recommendData()
})

</script>

<style lang="scss" scoped></style>