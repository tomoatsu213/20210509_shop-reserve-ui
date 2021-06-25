<template>
  <div>
    <div class="card">
      <p class="card-title">Login</p>
      <div class="tabs">
        <input
          class="radio"
          type="radio"
          id="user-tab"
          value="1"
          v-model="isActive"
        />
        <label class="tab" for="user-tab">User</label>
        <input
          class="radio"
          type="radio"
          id="owner-tab"
          value="2"
          v-model="isActive"
        />
        <label class="tab"  for="owner-tab">Owner</label>
        <input
          class="radio"
          type="radio"
          id="admin-tab"
          value="3"
          v-model="isActive"
        />
        <label class="tab" for="admin-tab">Admin</label>
      </div>
      <form class="form" @submit.prevent>
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
          <button class="button" @click="userLogin()" v-if="isActive === '1'">
            ログイン
          </button>
          <button
            class="button"
            @click="ownerLogin()"
            v-else-if="isActive === '2'"
          >
            ログイン
          </button>
          <button
            class="button"
            @click="adminLogin()"
            v-else-if="isActive === '3'"
          >
            ログイン
          </button>
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
      isActive: "1",
      email: "",
      password: "",
    };
  },
  methods: {
    userLogin() {
      this.$store.dispatch("userFirstLogin", {
        email: this.email,
        password: this.password,
      });
      //送信をしたらテキストが空になるように更新
      this.email = "";
      this.password = "";
    },
    adminLogin() {
      this.$store.dispatch("adminFirstLogin", {
        admin_email: this.email,
        admin_password: this.password,
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

.tabs :checked + label{
  background-color: rgb(255, 94, 0);
  color:rgb(255, 255, 255);
}

.radio{
  display: none;
}

.tabs{
  padding:7.3px 0;
}

.tab{
  font-weight: bold;
  padding:7px 37.5px 7px 39px;
  border-top: none;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  color: black;
  background-color:rgb(214, 214, 255);
}
</style>