<template>
  <font-awesome-icon
    icon="window-close"
    class="fa-2x icon-cancel"
    @click="deleteReservation(value.id)"
  />
</template>

<script>
import axios from "axios";
export default {
  props: ["value"],
  methods: {
    deleteReservation(id) {
      axios
        .request({
          method: "delete",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + id + "/reservations",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
  },
};
</script>

<style scoped>
.icon-cancel {
  color: white;
  padding: 10px;
  cursor: pointer;
}
</style>
