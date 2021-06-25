<template>
  <div class="star">
    <StarRating
      :rating="value.shop_star"
      :increment="0.01"
      :max-rating="5"
      :star-size="20"
      :round-start-rating="false"
      :read-only="true"
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
  margin-left: 15px;
  font-size: 18px;
  color: red;
  font-weight: bold;
}
</style>