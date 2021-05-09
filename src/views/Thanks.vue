<template>
  <div>
    <CommonHeader/>
    <div class="card">
      <p>会員登録ありがとうございます</p>
      <div class="form">
          <button @click="$router.push('/login')">ログインする</button>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
export default {
  components: {
    CommonHeader
  }
};
</script>


<style scoped>
button {
  width: 100px;
  padding: 4px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}
.card {
  margin:20px auto;
  padding:50px 0;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card p {
  font-size: 1.6rem;
  text-align: center;
  color: rgb(0, 0, 0);
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

.form {
  text-align: center;
  overflow: hidden;
}

.form button {
  font-size: 1.2rem;
  margin: 15px 23px 15px 0;
}
</style>