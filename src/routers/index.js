import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@app/modules/home/index.vue"),
    },
  ],
});
