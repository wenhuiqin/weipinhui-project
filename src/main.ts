// 导入文件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 引入 vant 组件库
import vant from "vant"

// 引入 vant 样式
import "vant/lib/index.css"

// 挂载
const app = createApp(App)
app.use(createPinia())
app.use(router)
// 挂载 vant
app.use(vant)
app.mount('#app')
