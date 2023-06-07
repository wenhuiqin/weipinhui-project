<template>
  <div class="goodsList" v-for="item in 8" :key="item">
    <div class="item-box">
      <img src="" alt="">
      <p>1121</p>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.goodsList{
  width: 100%;
  .item-box {
  width: 95%;
  height: 230px;
  background-color: red;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 160px;
  }
}
}
</style>