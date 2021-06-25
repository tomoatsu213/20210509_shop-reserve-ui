<template>
  <div>
    <div class="card">
      <p class="card-title">Login</p>
      <form class="form" @submit.prevent="sendContact()">
        <div class="flex">
          <font-awesome-icon icon="envelope" class="fa-2x icon" />
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              name="Email"
              placeholder="Email"
              type="email"
              class="input email"
              v-model="email"
            />
            <p class="validation">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="flex">
          <font-awesome-icon icon="lock" class="fa-2x icon" />
          <ValidationProvider rules="required|min:6" v-slot="{ errors }">
            <input
              name="Password"
              placeholder="Password"
              type="password"
              class="input password"
              v-model="password"
            />
            <p class="validation">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="form-button">
          <button class="button">ログイン</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ValidationProvider, localize, extend } from "vee-validate";
// ルール設定
import * as rules from "vee-validate/dist/rules";
for (let rule in rules) {
  extend(rule, rules[rule]);
}

// 日本語化
import ja from "vee-validate/dist/locale/ja";
localize("ja", ja);

// コンポーネント設定
Vue.component("ValidationProvider", ValidationProvider);
export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  // バリデーション
  methods: {
    sendContact() {
      this.$store.dispatch("firstLogin", {
        email: this.email,
        password: this.password,
      });
      //送信をしたらテキストが空になるように更新
      this.email = "";
      this.password = "";
    },
  },
};
</script>


<style scoped>
.button {
  float: right;
  margin: 15px 23px 15px 0;
  width: 80px;
  padding: 4px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  cursor: pointer;
}
.card {
  margin: 100px auto;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card-title {
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  background-color: rgb(53, 96, 246);
  padding: 15px;
}

.input {
  margin-top: 15px;
  padding: 5px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid black;
  color: black;
  outline: none;
}

.form {
  text-align: center;
  overflow: hidden;
}

.icon {
  padding: 18px 5px 0 15px;
}

.email {
  width: 278px;
}

.password {
  width: 280px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

.validation {
  text-align: left;
  padding-top: 5px;
  color: rgb(228, 0, 0);
  width: 100%;
}
</style>