<template>
  <font-awesome-icon
    icon="heart"
    class="fa-2x icon-favorite"
    @click="deleteFavorite(value.id)"
    v-if="value.check_favorite"
  />
  <font-awesome-icon
    icon="heart"
    class="fa-2x icon-favorite-none"
    @click="addFavorite(value.id)"
    v-else
  />
</template>

<script>
import axios from "axios";
export default {
  props: ["value"],
  methods: {
    addFavorite(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .put("https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + id + "/favorites")
        .then((response) => {
          console.log(response);
          this.value.check_favorite = true;
        });
    },
    deleteFavorite(id) {
      axios
        .request({
          method: "delete",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + id + "/favorites",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          this.value.check_favorite = false;
        });
    },
  },
};
</script>

<style scoped>
.icon-favorite {
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.icon-favorite-none {
  color: rgb(206, 206, 206);
  cursor: pointer;
  padding: 15px 0 0 0;
}
</style>