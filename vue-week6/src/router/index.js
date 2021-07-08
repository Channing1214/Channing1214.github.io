import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/front",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Front.vue"),
    children: [
      {
        path: "products",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Products.vue"),
      },
      {
        path: "product/:id",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Product.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "products",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/admin/Products.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
