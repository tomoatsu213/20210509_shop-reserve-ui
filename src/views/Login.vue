<template>
  <div>
    <CommonHeader />
    <div class="card">
      <p>Login</p>
      <form action="" @submit.prevent="sendContact()">
        <div class="flex">
          <font-awesome-icon icon="envelope" class="fa-2x icon" />
          <input
            placeholder="Email"
            type="email"
            class="email"
            v-model="email"
          />
        </div>
        <div class="flex">
          <font-awesome-icon icon="lock" class="fa-2x icon" />
          <input
            placeholder="Password"
            type="password"
            class="password"
            v-model="password"
          />
        </div>
        <div class="form-button">
          <button @click="auth">ログイン</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    CommonHeader,
  },
  // バリデーション
  methods: {
    sendContact() {
      if (this.email == "" || this.password == "") {
        alert("入力されていない項目があります");
      } else {
        //送信をしたらテキストが空になるように更新
        this.email = "";
        this.password = "";
        alert("送信しました");
      }
    },
    auth() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>


<style scoped>
button {
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
.card p {
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  background-color: rgb(53, 96, 246);
  padding: 15px;
}
input {
  margin-top: 15px;
  padding: 5px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid black;
  color: black;
  outline: none;
}

form {
  text-align: center;
  overflow: hidden;
}

form button {
  float: right;
  margin: 15px 23px 15px 0;
}

.icon {
  padding: 18px 5px 0 15px;
}

.user {
  width: 79.5%;
}

.email {
  width: 78.8%;
}

.password {
  width: 79.5%;
}

.flex {
  display: flex;
  justify-content: start;
}
</style>