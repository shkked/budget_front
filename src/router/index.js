import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import LoginPage from "@/views/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/table",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "MainPage",
        component: () => import("@/views/TablePage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: EmptyLayout,
    children: [{ path: "", name: "LoginPage", component: LoginPage }],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
