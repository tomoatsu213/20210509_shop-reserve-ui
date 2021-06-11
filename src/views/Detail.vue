<template>
  <div class="container">
    <div>
      <h2 class="shop-name">{{ restaurants.shop_name }}</h2>
      <div class="card-shop-space">
        <img
          :src="restaurants.shop_image"
          alt="#"
          width="350px"
          height="auto"
        />
        <p class="card-shop-text">
          #{{ restaurants.shop_area }} #{{ restaurants.shop_genre }}
        </p>
        <div class="star">
          <StarRating
            :rating="restaurants.shop_star"
            :increment="0.01"
            :max-rating="5"
            :star-size="20"
            :round-start-rating="false"
            :read-only="true"
          />
        </div>
        <p class="card-shop-text">{{ restaurants.shop_profile }}</p>
      </div>
    </div>
    <div class="content-right">
      <div class="card-reserve">
        <div>
          <p class="card-reserve-title">予約</p>
          <form action="">
            <input
              class="input-date"
              type="date"
              :min="restaurants.today"
              v-model="reservationDate"
            />
            <select
              class="select"
              name="time"
              id="time"
              v-model="reservationTime"
            >
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
              {{ this.restaurants.shop_name }}
            </td>
          </tr>
          <tr>
            <td class="table-reserve-items">Date</td>
            <td class="table-reserve-items">{{ this.reservationDate }}</td>
          </tr>
          <tr>
            <td class="table-reserve-items">Time</td>
            <td class="table-reserve-items">{{ this.reservationTime }}</td>
          </tr>
          <tr>
            <td class="table-reserve-items">Number</td>
            <td class="table-reserve-items">{{ this.reservationNumber }}人</td>
          </tr>
        </table>
        <button class="button-reserve" @click="addReservation()">
          予約する
        </button>
      </div>
    </div>
    <div class="content-review">
      <h2 class="review-title">お店のユーザーレビュー</h2>
      <div
        class="card-shop-review"
        v-for="value in restaurantReviews"
        :key="value.id"
      >
      <p>評価日時：{{value.created_at}}</p>
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
        <p class="user_comment">{{ value.user_comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating,
  },
  props: ["id"],

  data() {
    return {
      restaurants: [],
      restaurantReviews: [],
      reservationDate: "",
      reservationTime: "",
      reservationNumber: "",
      timeLists: [],
      numberLists: [],
    };
  },
  methods: {
    getTimeLists() {
      const timeLists = ":00";
      for (let i = 10; i < 22; i++) {
        this.timeLists.push(i + timeLists);
      }
    },
    getNumberLists() {
      for (let i = 1; i < 21; i++) {
        this.numberLists.push(i);
      }
    },
    addReservation() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .post(
          "http://127.0.0.1:8000/api/v1/shops/" + this.id + "/reservations",
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
    async getShop() {
      let shopData = [];
      await axios
        .get("http://127.0.0.1:8000/api/v1/shops/" + this.id)
        .then((response) => {
          shopData.push(response.data);
          this.restaurants = shopData[0].data;
          console.log(this.restaurants);
        });
    // },
    // getShopReviews() {
      let shopReviewData = [];
      await axios
        .get("http://127.0.0.1:8000/api/v1/shops/" + this.id + "/reviews")
        .then((response) => {
          shopReviewData.push(response.data);
          this.restaurantReviews = shopReviewData[0].data;
          console.log(this.restaurantReviews);
        });
    },
  },
  created() {
    this.getShop();
    // this.getShopReviews();
    this.getTimeLists();
    this.getNumberLists();
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

.container {
  margin: 30px 20px;
  width: 50%;
}

.content-right {
  position: absolute;
  top: 20px;
  left: 50%;
}

.card-shop-space {
  width: 350px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.card-shop-text {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 0;
  line-height: 15px;
}

.shop-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 15px 0;
}

.input-date {
  display: block;
  width: 40%;
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

.content-review {
  margin-top: 20px;
}

.review-title {
  font-size: 1.6rem;
  margin-bottom:10px;
}

.card-shop-review {
  width: 350px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
  padding: 5px;
  margin-bottom: 10px;
}

.star {
  font-size: 18px;
  padding-top:5px;
  padding-bottom:5px;
  color: red;
  font-weight: bold;
}
</style>