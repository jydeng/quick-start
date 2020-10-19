// Vue 3件套
import Vue from "vue";
import router from "./routers";
import store from "./store";
// 主样式
import "@styles/main.css";
// svg图标
import "./assets/icons";
// 自定义组件
import components from "./components";
// 一切的开始
import App from "./App";

// 引用自定义组件
Vue.use(components);

// 初始化vue实例
const entity = new Vue({
  router,
  store,
  render: (h) => h(App),
});

// 手动挂载到#app
entity.$mount("#app");
