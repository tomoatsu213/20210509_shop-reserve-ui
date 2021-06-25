<template>
  <button v-if="value.reviewed" class="button" @click="alterReview(value)">
    評価更新
  </button>
  <button v-else class="button" @click="addReview(value)">評価投稿</button>
</template>

<script>
import axios from "axios";
export default {
  props: ["value"],
  methods: {
    addReview(value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .post("https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + value.id + "/reviews", {
          shop_star: value.shop_star,
          user_comment: value.user_comment,
        })
        .then((response) => {
          console.log(response);
          value.reviewed = true;
        });
    },
    alterReview(value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .patch("https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + value.id + "/reviews", {
          shop_star: value.shop_star,
          user_comment: value.user_comment,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
};
</script>


<style scoped>
.button {
  font-size: 1.2rem;
  width: 80px;
  padding: 4px 0px;
  margin: 10px 0 0 0;
  color: #fff;
  background-color: rgb(255, 109, 89);
  border-radius: 5px;
  cursor: pointer;
}
</style>