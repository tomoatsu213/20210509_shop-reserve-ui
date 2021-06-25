<template>
  <button
    class="alter-reservation-button"
    @click="alterReservation(value)"
    v-if="value.hide_edit === false"
  >
    予約変更する
  </button>
</template>

<script>
import axios from "axios";
export default {
  props: ["value"],
  methods: {
    alterReservation(value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .patch(
          "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + value.id + "/reservations",
          {
            reservation_date: value.reservation_date,
            reservation_time: value.reservation_time,
            reservation_number: value.reservation_number,
          }
        )
        .then((response) => {
          console.log(response);
          value.hide_edit = !value.hide_edit;
        });
    },
  },
};
</script>

<style scoped>
.alter-reservation-button {
  font-size: 1.2rem;
  width: 100px;
  padding: 4px 0px;
  margin: 10px 0 0 110px;
  color: rgb(53, 96, 246);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;
}
</style>