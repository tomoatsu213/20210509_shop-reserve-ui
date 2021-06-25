import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Thanks from "../views/Thanks.vue";
import Login from "../views/Login.vue";
import MyPage from "../views/MyPage.vue";
import Detail from "../views/Detail.vue";
import Done from "../views/Done.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/thanks",
    name: "Thanks",
    component: Thanks,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
    meta: {
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "/done",
    name: "Done",
    component: Done,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
