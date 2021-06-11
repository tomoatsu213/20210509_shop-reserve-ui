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
    // accessTokenCreatedDate: "",
    // accessTokenExpiration: "",
    // refreshToken: "",
    user: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    accessToken(state, payload) {
      state.accessToken = payload;
    },
    // accessTokenCreatedDate(state, payload) {
    //   state.accessTokenCreatedDate = payload;
    // },
    // accessTokenExpiration(state, payload) {
    //   state.accessTokenExpiration = payload;
    // },
    user(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    firstLogin({ commit }, { email, password }) {
      axios
        .post("http://127.0.0.1:8000/api/v1/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          const token = res.data.access_token;
          // const accessTokenExpiration = res.data.expires_in;
          // commit("accessTokenExpiration", accessTokenExpiration);
          commit("accessToken", token);
          commit("auth", true);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          axios
            .get("http://127.0.0.1:8000/api/v1/auth/user-profile")
            .then((res) => {
              // console.log(res);
              const userProfile = res.data;
              commit("user", userProfile);
              console.log(this.state.user);
              router.replace("/");
            });
        })
        .catch((error) => {
          console.log(error);
          alert("ログインできません");
        });
    },
    secondLogin({ commit }) {
      axios
        .get("http://127.0.0.1:8000/api/v1/auth/refresh")
        .then((res) => {
          console.log(res);
          const token = res.data.access_token;
          commit("accessToken", token);
        })
        .catch((error) => {
          console.log(error);
          commit("accessToken", null);
          commit("auth", false);
          router.replace("/login");
        });
      // });
    },
    logout({ commit }) {
      axios
        .post("http://127.0.0.1:8000/api/v1/auth/logout")
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
