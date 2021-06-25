<template>
  <div class="card-reserve">
    <div>
      <p class="card-reserve-title">予約</p>
      <form>
        <input
          class="input-date"
          type="date"
          :min="restaurants.today"
          v-model="reservationDate"
        />
        <select class="select" name="time" id="time" v-model="reservationTime">
          <option value="" disabled selected hidden>
            時刻を選択してください
          </option>
          <option
            v-for="timeList in timeLists"
            :key="timeList"
            :value="timeList"
          >
            {{ timeList }}
          </option>
        </select>
        <select
          class="select"
          name="number"
          id="number"
          v-model="reservationNumber"
        >
          <option value="" disabled selected hidden>
            人数を選択してください
          </option>
          <option
            v-for="numberList in numberLists"
            :key="numberList"
            :value="numberList"
          >
            {{ numberList }}人
          </option>
        </select>
      </form>
    </div>
    <table class="table-reserve">
      <tr>
        <td class="table-reserve-items">Shop</td>
        <td class="table-reserve-items">
          {{ restaurants.shop_name }}
        </td>
      </tr>
      <tr>
        <td class="table-reserve-items">Date</td>
        <td class="table-reserve-items">{{ reservationDate }}</td>
      </tr>
      <tr>
        <td class="table-reserve-items">Time</td>
        <td class="table-reserve-items">{{ reservationTime }}</td>
      </tr>
      <tr>
        <td class="table-reserve-items">Number</td>
        <td class="table-reserve-items">{{ reservationNumber }}人</td>
      </tr>
    </table>
    <button class="button-reserve" @click="addReservation(restaurants)">予約する</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["restaurants", "timeLists", "numberLists"],
  data() {
    return {
      reservationDate: "",
      reservationTime: "",
      reservationNumber: "",
    };
  },
  methods: {
    addReservation(restaurants) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .post(
          "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + restaurants.id + "/reservations",
          {
            reservation_date: this.reservationDate,
            reservation_time: this.reservationTime,
            reservation_number: this.reservationNumber,
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/done");
        });
    },
  },
};
</script>

<style scoped>
.button-reserve {
  text-align: center;
  font-size: 1.2rem;
  width: 100%;
  padding: 10px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border: none;
  cursor: pointer;
}

.input-date {
  display: block;
  width: 50%;
  margin: 0 0 10px 20px;
}

.select {
  display: block;
  width: 80%;
  margin: 0 0 10px 20px;
}

.card-reserve {
  width: 300px;
  background-color: rgb(88, 120, 238);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card-reserve-title {
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

.table-reserve {
  margin: 0 0 150px 20px;
  width: 80%;
  height: 100px;
  background-color: rgb(1, 146, 243);
  border-radius: 5px;
}

.table-reserve-items {
  text-align: left;
  padding: 8px 5px 0 10px;
  font-size: 1rem;
  color: white;
}
</style>