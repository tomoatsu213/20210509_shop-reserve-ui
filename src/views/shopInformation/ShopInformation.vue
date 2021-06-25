<template>
  <div>
    <img :src="value.shop_image" alt="#" width="180px" height="auto" />
    <p class="shop-name">{{ value.shop_name }}</p>
    <p class="shop-info">#{{ value.shop_area }} #{{ value.shop_genre }}</p>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style scoped>
.shop-name {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
  font-size: 1.6rem;
  font-weight: bold;
}

.shop-info {
  font-size: 1rem;
  padding: 10px 0 2px 15px;
}
</style>