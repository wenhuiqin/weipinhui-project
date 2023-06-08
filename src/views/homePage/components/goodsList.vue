<template>
  <div class="goodsList" >
    <div class="item-box" v-for="item in props.brandList" :key="item.brand">
      <img src="https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2023/05/24/54/ias_ee4a2bc516314faaf48562dff7c6667a_1135x545_85.jpg" alt="">
      <div>
        <h4>{{ item.brand }}</h4>
        <span>￥ 999 元</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['brandList'])

</script>

<style lang="scss" scoped>
.goodsList{
  width: 100%;
  .item-box {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
  }
  div{
    height: 90px;
    display: flex;
    flex-direction: column;
    padding:0 20px;
    box-sizing: border-box;
    background-color: #f1f3f4;
    margin-top: -7px;
    h4{
      font-size: 14px;
      line-height: 20px;
      margin: 10px 0;
    }
    span {
      font-size: 12px;
      color: red;
    }
  }
}
}
</style>