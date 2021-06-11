<template>
  <div>
    <h1 class="user-name">{{ $store.state.user.user_name }}さん</h1>
    <div class="container">
      <div class="contents content-left">
        <h2 class="contents-title">予約状況</h2>
        <div
          class="card-reserve"
          v-for="(value, id) in userReservedRestaurants"
          :key="id"
        >
          <div class="table-header">
            <div class="table-title">
              <font-awesome-icon icon="clock" class="fa-2x icon-clock" />
              <p class="card-reserve-text">予約{{ id + 1 }}</p>
            </div>

            <font-awesome-icon
              icon="edit"
              class="fa-2x icon-cancel"
              @click="changeEditBox(value, id)"
            />
            <font-awesome-icon
              icon="window-close"
              class="fa-2x icon-cancel"
              @click="deleteReservation(value.id)"
            />
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
                  class="input-date"
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
                <select
                  class="select"
                  name="time"
                  id="time"
                  v-model="value.reservation_time"
                >
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
                <select
                  class="select"
                  name="number"
                  id="number"
                  v-model="value.reservation_number"
                >
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
          <button
            class="alter-reservation-button"
            @click="alterReservation(value, id)"
            v-if="value.hide_edit === false"
          >
            予約変更する
          </button>
        </div>
      </div>
      <div class="contents">
        <h2 class="contents-title">お気に入り店舗</h2>
        <div class="content-right">
          <div
            class="card-space"
            v-for="(value, id) in userFavoriteRestaurants"
            :key="id"
          >
            <div class="card-shop">
              <img
                :src="value.shop_image"
                alt="#"
                width="180px"
                height="auto"
              />
              <p class="card-shop-name">{{ value.shop_name }}</p>
              <p class="card-shop-text">
                #{{ value.shop_area }} #{{ value.shop_genre }}
              </p>
              <div class="star">
                <StarRating
                  v-model="value.shop_star"
                  :increment="0.01"
                  :max-rating="5"
                  :star-size="20"
                  :round-start-rating="false"
                  :read-only="true"
                />
              </div>
              <div class="card-footer">
                <button
                  class="detail-button"
                  @click="
                    $router.push({
                      path: '/detail/' + value.id,
                      params: { id: value.id },
                    })
                  "
                >
                  詳しくみる
                </button>
                <font-awesome-icon
                  icon="heart"
                  class="fa-2x icon-favorite"
                  @click="deleteFavorite(value.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="visit-shop">
        <h2 class="contents-title">訪れた店舗</h2>
        <div class="content-right">
          <div
            class="card-space"
            v-for="(value, id) in userReviewedRestaurants"
            :key="id"
          >
            <div class="card-shop">
              <img
                :src="value.shop_image"
                alt="#"
                width="180px"
                height="auto"
              />
              <p class="card-shop-name">{{ value.shop_name }}</p>
              <p class="card-shop-text">
                #{{ value.shop_area }} #{{ value.shop_genre }}
              </p>
              <p class="review card-shop-text">
                {{ $store.state.user.user_name }}さんの評価
              </p>
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
              <input type="text" v-model="value.user_comment" />
              <div class="card-footer">
                <button
                  class="detail-button"
                  @click="
                    $router.push({
                      path: '/detail/' + value.id,
                      params: { id: value.id },
                    })
                  "
                >
                  詳しくみる
                </button>
                <button
                  v-if="value.reviewed"
                  class="review-button detail-button"
                  @click="alterReview(value, id)"
                >
                  評価更新
                </button>
                <button
                  v-else
                  class="review-button detail-button"
                  @click="addReview(value, id)"
                >
                  評価投稿
                </button>
              </div>
            </div>
          </div>
        </div>
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
      userReservedRestaurants: [],
      userFavoriteRestaurants: [],
      userReviewedRestaurants: [],
      timeLists: [],
      numberLists: [],
      hideEdit: "true",
      satisfaction: 1,
      reservedItems: [],
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
    changeEditBox(value) {
      value.hide_edit = !value.hide_edit;
    },
    alterReservation(value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .patch(
          "http://127.0.0.1:8000/api/v1/shops/" + value.id + "/reservations",
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
    deleteReservation(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .request({
          method: "delete",
          url: "http://127.0.0.1:8000/api/v1/shops/" + id + "/reservations",
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    deleteFavorite(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .request({
          method: "delete",
          url: "http://127.0.0.1:8000/api/v1/shops/" + id + "/favorites",
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    addReview(value) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .post("http://127.0.0.1:8000/api/v1/shops/" + value.id + "/reviews", {
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
        .patch("http://127.0.0.1:8000/api/v1/shops/" + value.id + "/reviews", {
          shop_star: value.shop_star,
          user_comment: value.user_comment,
        })
        .then((response) => {
          console.log(response);
        });
    },
    async getUsersShops() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      let reservedItems = [];
      await axios
        .post("http://127.0.0.1:8000/api/v1/shops/visits")
        .then((response) => {
          console.log(response.data);
        });
      await axios
        .get(
          "http://127.0.0.1:8000/api/v1/users/reservations"
        )
        .then((response) => {
          reservedItems.push(response.data);
          this.userReservedRestaurants = reservedItems[0].data;
          console.log(this.userReservedRestaurants);
        });

      let favoriteItems = [];
      await axios
        .get(
          "http://127.0.0.1:8000/api/v1/users/favorites"
        )
        .then((response) => {
          favoriteItems.push(response.data);
          this.userFavoriteRestaurants = favoriteItems[0].data;
        });
      let visitItems = [];
      axios
        .get(
          "http://127.0.0.1:8000/api/v1/users/visits"
        )
        .then((response) => {
          visitItems.push(response.data);
          this.userReviewedRestaurants = visitItems[0].data;
        });
    },
  },
  created() {
    this.getUsersShops();
    this.getTimeLists();
    this.getNumberLists();
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

.detail-button {
  font-size: 1.2rem;
  width: 80px;
  padding: 4px 0px;
  margin: 10px 0 0 0;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}

.user-name {
  position: absolute;
  left: 52%;
  font-size: 2rem;
  margin: 50px 0 0 0;
}

.container {
  display: flex;
  justify-content: space-between;
}

.contents {
  margin: 100px 0 0 0;
  width: 50%;
}

.content-left {
  margin-left: 40px;
}

.content-right {
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
}

.contents-title {
  font-size: 1.8rem;
  margin: 15px 0;
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

.card-shop {
  width: 180px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}

.card-footer {
  display: flex;
  justify-content: space-around;
}

.card-shop-name {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
  font-size: 1.6rem;
  font-weight: bold;
}

.card-shop-text {
  font-size: 1rem;
  padding: 10px 0 2px 15px;
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

.table-header {
  display: flex;
  justify-content: space-between;
}

.table-title {
  display: flex;
  justify-content: start;
  margin-left: 10px;
}

.icon-clock {
  color: white;
  padding: 10px;
}

.icon-cancel {
  color: white;
  padding: 10px;
  cursor: pointer;
}

.icon-favorite {
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.table-footer {
  display: flex;
  justify-content: space-around;
}

.star {
  margin-left: 20px;
  font-size: 18px;
  color: red;
  font-weight: bold;
}

.visit-shop {
  margin: 40px 0 0 40px;
}

.review {
  color: rgb(255, 109, 89);
  font-size: 12px;
}

.review-button {
  background-color: rgb(255, 109, 89);
}
</style>