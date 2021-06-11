<template>
  <div class="card">
    <p class="card-text">ご予約ありがとうございます</p>
    <div class="form">
      <button class="button" @click="$router.push('/my-page')">戻る</button>
    </div>
  </div>
</template>

<style scoped>
.button {
  font-size: 1.2rem;
  margin: 15px 23px 15px 0;
  padding: 4px 0px;
  width: 40px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}
.card {
  margin: 20px auto;
  padding: 50px 0;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card-text {
  font-size: 1.6rem;
  text-align: center;
  color: rgb(0, 0, 0);
  padding: 15px;
}

.form {
  text-align: center;
  overflow: hidden;
}

</style>