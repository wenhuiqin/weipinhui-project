<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component title="购物车"></header-component>
    </Teleport>
    我是购物车页
  </div>
</template>

<script lang="ts" setup>
import headerComponent from '@/components/HeaderComponent.vue';
</script>

<style lang="scss" scoped></style>