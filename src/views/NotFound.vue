<template>
  <div>
    <h1 class="title">404 Not Found</h1>
    <button class="button" @click="$router.push('/my-page')">戻る</button>
  </div>
</template>

<style scoped>
.title {
  font-size: 2rem;
  margin: 20px;
}
.button {
  font-size: 1.2rem;
  margin: 15px 23px 15px 15px;
  padding: 4px 0px;
  width: 40px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}
</style>