<template>
  <div class="home-page">
    <Teleport to="header">
      <header-component></header-component>
    </Teleport>
    我是个人中心页
  </div>
</template>

<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<style lang="scss" scoped></style>