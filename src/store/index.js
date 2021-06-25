import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    accessToken: "",
    user: "",
    admin: ""
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    accessToken(state, payload) {
      state.accessToken = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    admin(state, payload) {
      state.admin = payload;
    },
  },
  actions: {
    userFirstLogin({ commit }, { email, password }) {
      axios
        .post("https://stormy-lake-54158.herokuapp/api/v1/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          const token = res.data.access_token;
          commit("accessToken", token);
          commit("auth", true);
          axios
            .request({
              method: "get",
              url: "https://stormy-lake-54158.herokuapp/api/v1/user-profile",
              headers: {
                "Authorization": "Bearer " + token,
              }
            })
            .then((res) => {
              const userProfile = res.data;
              commit("user", userProfile);
              console.log(this.state.user);
              router.replace("/");
            }).catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          alert("ログインできません");
        });
    },
    secondLogin({ commit }) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.state.accessToken;
      axios
        .get("https://stormy-lake-54158.herokuapp.com/api/v1/refresh")
        .then((res) => {
          console.log(res);
          const token = res.data.access_token;
          commit("accessToken", token);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          commit("accessToken", null);
          commit("auth", false);
          router.replace("/login");
        });
    },
    logout({ commit }) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.state.accessToken;
      axios
        .post("https://stormy-lake-54158.herokuapp.com/api/v1/logout")
        .then((res) => {
          console.log(res);
          commit("accessToken", null);
          commit("auth", false);
          router.replace("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    adminFirstLogin({ commit }, { email, password }) {
      axios
        .post("https://stormy-lake-54158.herokuapp.com/api/v1/admin/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          const token = res.data.access_token;
          commit("accessToken", token);
          commit("auth", true);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios.get("https://stormy-lake-54158.herokuapp.com/api/v1/admin/admin-profile").then((res) => {
            const adminProfile = res.data;
            commit("admin", adminProfile);
            console.log(this.state.admin);
            router.replace("/");
          });
        })
        .catch((error) => {
          console.log(error);
          alert("ログインできません");
        });
    },
    adminLogout({ commit }) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.state.accessToken;
      axios
        .post("https://stormy-lake-54158.herokuapp.com/api/v1/admin/logout")
        .then((res) => {
          console.log(res);
          commit("accessToken", null);
          commit("auth", false);
          router.replace("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
