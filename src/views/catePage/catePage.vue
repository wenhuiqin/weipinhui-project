<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    <div class="cate-box">
      <van-sidebar v-model="active">
        <van-sidebar-item
        v-for="item in cateListData"
        :key="item"
        :title="item"
        />
      </van-sidebar>
      <div>1111</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { getCategorylist } from '@/apis/goods';
import { ref, onMounted } from 'vue';
const active = ref<number>(0)

// 定义接口
interface goodsInfo{
  code:string
  message:string
}

// 存储分类列表数据
const cateListData = ref<Array<string>>([])

// 获取分类列表
const getCateList = async() => {
  const res = await getCategorylist()
  console.log(res);
  if((res as unknown as goodsInfo).code !== "200") return
  cateListData.value = res.data
}

// 挂载后获取数据
onMounted( () => {
  getCateList()
})
</script>

<style lang="scss" scoped>
.van-sidebar-item--select:before {
  background-color: #f02387;
}

.cate-box {
  display: flex;
}
</style>