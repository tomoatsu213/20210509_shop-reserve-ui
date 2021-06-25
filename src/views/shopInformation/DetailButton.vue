<template>
  <button
    class="button"
    @click="
      $router.push({
        path: '/detail/' + id,
        params: { id: id },
      })
    "
  >
    詳しくみる
  </button>
</template>

<script>
export default {
  props: ["id"],
  }
</script>


<style scoped>

.button {
  font-size: 1.2rem;
  width: 80px;
  padding: 4px 0px;
  margin: 10px 0 0 0;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}

</style>

