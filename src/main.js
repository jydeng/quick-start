import Vue from "vue";
import "@styles/main.css";
import App from "./App";
import router from "./routers";
import store from "./store";

// 初始化vue实例
const entity = new Vue({
  router,
  store,
  render: (h) => h(App),
});

// 手动挂载到#app
entity.$mount("#app");
