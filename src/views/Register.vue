<template>
  <div>
    <div class="card">
      <p class="card-title">Registration</p>
      <form class="form" @submit.prevent="register()">
        <div class="flex">
          <font-awesome-icon icon="user" class="fa-2x icon" />
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input
              name="Username"
              placeholder="Username"
              type="text"
              class="input"
              v-model="user_name"
            />
            <p class="validation">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="flex">
          <font-awesome-icon icon="envelope" class="fa-2x icon" />
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input
              name="Email"
              placeholder="Email"
              type="email"
              class="input"
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
              class="input"
              v-model="password"
            />
            <p class="validation">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="flex">
          <font-awesome-icon icon="lock" class="fa-2x icon" />
          <ValidationProvider rules="required|min:6" v-slot="{ errors }">
            <input
              name="Confirmation of Password"
              placeholder="Confirmation of password"
              type="password"
              class="input"
              v-model="password_confirmation"
            />
            <p class="validation">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
        <div class="form-button">
          <button class="button">登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      user_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  // バリデーション
  methods: {
    register() {
      axios
        .post("https://stormy-lake-54158.herokuapp.com/api/v1/registrations", {
          user_name: this.user_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((response) => {
          console.log(response);
          //送信をしたらテキストが空になるように更新
          this.user_name = "";
          this.email = "";
          this.password = "";
          this.password_confirmation = "";
          this.$router.replace("/thanks");
        })
        .catch(() => {
          alert('登録できません');
        });
    },
  },
};
</script>


<style scoped>
.button {
  float: right;
  width: 40px;
  margin: 15px 23px 15px 0;
  padding: 4px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}
.card {
  margin: 100px auto;
  width: 400px;
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
  width:325px;
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