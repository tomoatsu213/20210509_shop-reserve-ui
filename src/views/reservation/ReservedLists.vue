<template>
  <div>
    <div class="table-header">
      <div class="table-title">
        <font-awesome-icon icon="clock" class="fa-2x icon-clock" />
        <p class="card-reserve-text">予約{{ id + 1 }}</p>
      </div>
      <EditReservationButton :value="value"></EditReservationButton>
      <DeleteReservationButton :value="value"></DeleteReservationButton>
    </div>
    <table class="table-reserve">
      <tr>
        <td class="table-reserve-items">Shop</td>
        <td class="table-reserve-items">{{ value.shop_name }}</td>
      </tr>
      <tr>
        <td class="table-reserve-items">Date</td>
        <td class="table-reserve-items" v-if="value.hide_edit">
          {{ value.reservation_date }}
        </td>
        <td class="table-reserve-items" v-else>
          <input
            class="reserve-date"
            type="date"
            min="2021-04-30"
            v-model="value.reservation_date"
          />
        </td>
      </tr>
      <tr>
        <td class="table-reserve-items">Time</td>
        <td class="table-reserve-items" v-if="value.hide_edit">
          {{ value.reservation_time }}
        </td>
        <td class="table-reserve-items" v-else>
          <select name="time" id="time" v-model="value.reservation_time">
            <option
              v-for="timeList in timeLists"
              :key="timeList"
              :value="timeList"
            >
              {{ timeList }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="table-reserve-items">Number</td>
        <td class="table-reserve-items" v-if="value.hide_edit">
          {{ value.reservation_number }}人
        </td>

        <td class="table-reserve-items" v-else>
          <select name="number" id="number" v-model="value.reservation_number">
            <option
              v-for="numberList in numberLists"
              :key="numberList"
              :value="numberList"
            >
              {{ numberList }}人
            </option>
          </select>
        </td>
      </tr>
    </table>
    <AlterReservationButton :value="value"></AlterReservationButton>
  </div>
</template>

<script>
import EditReservationButton from "./EditReservationButton";
import AlterReservationButton from "./AlterReservationButton";
import DeleteReservationButton from "./DeleteReservationButton";
export default {
  props: ["value", "id"],
  components: {
    EditReservationButton,
    AlterReservationButton,
    DeleteReservationButton,
  },
  data() {
    return {
      timeLists: [],
      numberLists: [],
    };
  },
  methods: {
    getTimeLists() {
      const timeLists = ":00:00";
      for (let i = 10; i < 22; i++) {
        this.timeLists.push(i + timeLists);
      }
    },
    getNumberLists() {
      for (let i = 1; i < 21; i++) {
        this.numberLists.push(i);
      }
    },
  },
  created() {
    this.getTimeLists();
    this.getNumberLists();
  },
};
</script>

<style scoped>
.icon-clock {
  color: white;
  padding: 10px;
}

.card-reserve {
  width: 50%;
  padding-bottom: 20px;
  margin-bottom: 5px;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card-reserve-text {
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

.card-space {
  margin: 0 40px 40px 0;
}

.table-reserve {
  margin: 0 0 0 20px;
}

.table-reserve-items {
  text-align: left;
  padding: 10px 10px 0 0;
  font-size: 1rem;
  color: white;
}

.reserve-date {
  font-size: 1rem;
  width: 130px;
}

.table-header {
  display: flex;
  justify-content: space-between;
}

.table-title {
  display: flex;
  justify-content: start;
  margin-left: 10px;
}
</style>