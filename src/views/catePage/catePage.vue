<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <div class="slide">
      <van-sidebar v-model="index"  @change="changeHandler(index)">
        <van-sidebar-item
          v-for="item in cateListData"
          :key="item"
          :title="item.trim()" />
      </van-sidebar>
    </div>
    <div class="container">
      <div class="box" v-for="item in goodsList" :key="item.brandname">
        <div class="title">{{ item.brandname }}</div>
        <van-grid :column-num="3">
          <van-grid-item
            @click="chechDetailHandler(value.proid)"
            v-for="value in item.goods"
            :key="value.proid"
            icon="photo-o" >
            <van-image style="width: 200px; height: 200px;" :src="value.img1" />
            <van-text-ellipsis
              :content="value.proname"
              expand-text="展开"
              collapse-text="收起" />
          </van-grid-item>
        </van-grid>
      </div> 
    </div>   
  </div>
</template>

<script lang="ts" setup>

import HeaderComponent from '@/components/HeaderComponent.vue';
import { getCategorylist, getBrandList, getGoodsList } from '@/apis/goods';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter()

// 存储导航索引
const index = ref<number>(0)

// 定义接口
interface goodsInfo{
  code:string
  message:string
}
interface Goods {
  catename: string
  brandname: string
  goods: Array<{ proid: string, [key: string]: any }>
}

// 存储分类列表数据
const cateListData = ref<Array<string>>([])

// 存储商品列表
const goodsList = ref<Goods[]>([])

// 获取分类列表
const getCateList = async() => {
  const res = await getCategorylist()
  console.log(res);
  if((res as unknown as goodsInfo).code !== "200") return
  cateListData.value = res.data
}

// 存储当前索引的分类
const currentList = ref<string>("手机")

// 获取索引下的分类
const changeHandler = (index:number) => {
  currentList.value = cateListData.value[index]
  GoodsBrandList()
}

// 获取商品列表
const GoodsBrandList = async() => {
  goodsList.value = []
  const res = await getBrandList(currentList.value)
  if((res as unknown as goodsInfo).code !== "200") return
  res.data.forEach(async (item:{ brand:string }) => {
    console.log(item.brand);
    const response = await getGoodsList (currentList.value, item.brand)
    console.log(response.data);
    goodsList.value.push({
      catename:currentList.value,
      brandname:item.brand,
      goods:response.data
    })
  });
}

// 跳转详情页
const chechDetailHandler = (id:string) => {
  $router.push({ path:"/detail", query:{ id } })
}

// 挂载后获取数据
onMounted( () => {
  getCateList()
  GoodsBrandList()
})
</script>

<style lang="scss" scoped>
.van-sidebar-item--select:before {
  background-color: #f02387;
}

.home-page{
  height: 100%;
  display: flex;
  overflow: hidden;

  > .slide {
    width: 200px;
    height: 100%;
    overflow: hidden;
  }

  > .container {
    flex: 1;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;

    > .box {
      margin-top: 30px;
    }
    .van-grid-item {
      background-color: red;
      display: block;
      margin: 20px;
      border: 20px;
      margin-left: 0;
    }
    van-text-ellipsis{
      text-align: left;
    }

  }

}
</style>