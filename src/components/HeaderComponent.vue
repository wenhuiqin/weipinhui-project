<template>
  <div class="Header">
    <!-- 首页头部组件 -->
    <van-nav-bar left-arrow v-if="$route.meta.home">
      <!-- 左边自定义内容 -->
      <template #left>
        <!-- 唯品会 logo -->
        <van-image
          class="header-logo"
          width="70"
          height="18"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAAA8CAMAAABB5Ob9AAAAh1BMVEUAAADfPZffPpbfPZffPZffPZfkQJvePpffP5jfPpfiQZnfPZffPpffPpffPZbgP5b/SrbgP5jhP5jePZffPZffQZffPpfoRZnjR5vfPpjfPZfgPZbhP5jgPpbgQJbfPpbzTKvfPZbfPpffPpfePZffPpfqSKLhP5jjPpjhQZnfPZffPpjePZZ5hFqyAAAALHRSTlMAuaHB9uEb2k+QIsVegdR6BGpG+pYn5xYRdKuTMms4tAfyzKbrVgs+NS2+b5zP9kQAAAPlSURBVGje7ZrpsqIwEEYbZBVQBAXccd/y/s83G7HjEEPYZuKte/6JBZUTpPtLEIRYe0I55PATp/g0AREhaUIGstxMPGsXQTtWeLEAQBnJaEcY4gm0wXlezDiBOpLrmLzihlBBzGUGAHNCSa6gjGQ4JSW2ZxBDuMwg1AllZEEzSXssw6iOZKYRiu3hCIeNJLM7oZhO9CQoji0jBuud5BZkWNSQHI4IZZDleB+OmwaSjk3k8f+Z5OZIKHoIAGOCVUNC0g5+49FziIqSPg5rXjw+eCSoltTgNy49RUXJAJujw+lyh/zzJfMFVokVN694aXPJxQqhbSVYMWT/QjJFmb0FDGdG/tZYcgpQ0UL6l2ST3CKv/BnLSy4VknR2ogLjYwZ61JLcOUN1JB/YKvyK1jIN5SXNGygjGU6Zpl8ZErRMVnKfgjKSmcbEN5m4N5SUnIEykkNbcJOQcIm3+/JpkpcjVsIQREye5Sf2lZOkj1MOHHwc+brGYjpQTHJNS504yZFEq8RmEsxZHclwo2Pm4CW5xuytWpLeHNHpRM0Zbu8kDbuCJMYGOORto7XAXElJtgjotYl93jZaK3aOYpKJI0pyZi2YRadCkvF+Xa6sc8GiX8wqYbYP+pMEXZqp+4jOwiSXXEGM6FkeZJKSeor4xbFxypBD12R3tkrKwV9i2rM2LaRXJi4lOEMTHniBvHPJ1BLxa8CZJSKF7ulc0iYi1phh3uDBb74lvyU/TNLRW7PuVfLov+ByJAP/hbgkOSatWfQqacILDkdyAy8Y35JfVnJusDxzrlGDg7zkaIlsaSZcMlw7lKx61zPsp7pW4/cumR+fw/y6kj4pOH1hSbp2SsK+JI0Eoav1XcJw6lvySgoClRJPx5K6ZNm5DgounyeZ0gZyBzFhQhukQBLnzFJJcixZdvDisSWQzM3ikQOFJEOTvsjJoYKhxGuC8Ll3rJLkiRS4UImG88GR9K5XZ/xcKEUqSQ7wv3CVnPg7iITDARSSvBFu2amIRvsqyW3eseQJz3onGReZGEpMa6UdF2+7SDKZhNCpJI7TeSt5wd/QX2QGPmYSRFTj8V7S1E9ngI4lNzE2Jr7keY9vL/5iLld2cLZ40xUhl1sGSFeS2WOHGzhcyTAa0f5WjjSmRNlBZh4pGIAEKGlqCJ3xkcYQlSQNjXIfxYRyYSU9vCbzrwCg4KxS/5EER3ZXoJpWqxA+Y0BJPt6Z0/gaMvkfkrsJVEkeyo6zpo5e+O8lTTcFsaSx3UCZZTPFeJpDPclkUEEETw6lL+/awl0zRcMvn69t9fGFO6pQ894weIu2cP0UZMHq+oVJD3/w4dP5AdK4gHoiM+nWAAAAAElFTkSuQmCC"
        />
        <p class="header-text">品牌特卖100%正品</p>
      </template>
      <!-- 右边自定义内容 -->
      <template #right>
        <RouterLink to="/center">
          <van-icon class="icon" name="friends-o" size="20" style="color:gray" />
        </RouterLink>
        <RouterLink to="/cate">
          <van-icon class="icon" name="apps-o" size="20"  style="color:gray" />
        </RouterLink>
      </template>
    </van-nav-bar>

    <!-- 分类页头部 -->
    <van-search
      class="search-box"
      v-else-if="$route.meta.search"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词">
    </van-search>
    
    <!-- 其他样式头部 -->
    <van-nav-bar
      v-else
      @click-left="$router.back()"
      left-arrow>
      <template #title v-if="title">{{ title }}</template>
      <template #right v-if="$route.meta.homeIcon ? 'true' : ''">
        <van-icon name="shop-o" />
      </template>
    </van-nav-bar>

  </div>
</template>

<script lang="ts" setup>
import { useRoute,useRouter } from 'vue-router';
const $route = useRoute()
const $router = useRouter()

// 定义一个接口
type Props = {
  title?:string
}

// 接收参数
const info = withDefaults(defineProps<Props>(),{})

console.log(info);

</script>

<style lang="scss" scoped>
.header-logo {
  padding-right: 5px;
}

.header-text{
  font-size: 12px;
  padding-left: 5px;
  border-left: 1px solid gray;
  color: gray;
  line-height: 15px;
}
.icon{
  margin: 0 5px;
}
</style>