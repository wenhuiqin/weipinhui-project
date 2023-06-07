<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component title="购物车"></header-component>
    </Teleport>
    <!-- 购物车列表 -->
    <cart-list></cart-list>
    <!-- 提交订单 -->
    <van-submit-bar :price="3050" button-text="提交订单" />
  </div>
</template>

<script lang="ts" setup>
import headerComponent from '@/components/HeaderComponent.vue';
import cartList from "./components/cartList.vue"
</script>

<style lang="scss" scoped></style>