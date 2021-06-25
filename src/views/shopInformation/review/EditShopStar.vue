<template>
  <div class="star">
    <StarRating
      v-model="value.shop_star"
      :increment="1"
      :max-rating="5"
      :star-size="20"
      :round-start-rating="false"
      :animate="true"
    />
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  props: ["value"],
  components: {
    StarRating,
  },
};
</script>


<style scoped>
.star {
  margin-left: 20px;
  font-size: 18px;
  color: red;
  font-weight: bold;
}
</style>