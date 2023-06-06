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
    />
    <!-- 分类滑动块 -->
    <van-grid class="swiper-box"  center :column-num="3">
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
      <van-grid-item text="文字" />
    </van-grid>
    <!-- 内容 -->
    <!-- 底部 -->
    <div class="footer">
      <RouterLink to="/cart" class="icon-box"><van-icon name="cart-o" /></RouterLink>
      <span class="icon-box"><van-icon name="back-top"  /></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>

.home-page{
  overflow: hidden;
  .swiper-box {
  flex-wrap: nowrap;
  overflow: auto;
  > .van-grid-item__content {
  width: 200px !important;
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
  line-height: 50px;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
  >.icon-box {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
  }
}
}

</style>