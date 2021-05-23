<template>
  <div>
    <CommonHeader />
    <h1>{{ $store.state.user.user_name }}さん</h1>
    <div class="container">
      <div class="contents content-left">
        <h2>予約状況</h2>
        <div
          class="card"
          v-for="(value, index) in newUserReservedRestaurants"
          :key="index"
        >
          <div class="table-header">
            <div class="table-title">
              <font-awesome-icon icon="clock" class="fa-2x icon-clock" />
              <p>予約{{ index + 1 }}</p>
            </div>

            <font-awesome-icon
              icon="window-close"
              class="fa-2x icon-cancel"
              @click="deleteReservation(index)"
            />
          </div>
          <table>
            <tr>
              <td>Shop</td>
              <td>{{ value.shop_name }}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{{ value.reservation_date }}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{{ value.reservation_time }}</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>{{ value.reservation_number }}人</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="contents">
        <h2>お気に入り店舗</h2>
        <div class="content-right">
          <div
            class="card-space"
            v-for="(value, index) in userFavoriteRestaurants"
            :key="index"
          >
            <div class="card-shop">
              <img
                :src="value.shop_image"
                alt="#"
                width="180px"
                height="auto"
              />
              <p class="shop-name">{{ value.shop_name }}</p>
              <p>
                #{{ value.areas[0].shop_area }} #{{
                  value.genres[0].shop_genre
                }}
              </p>
              <div class="card-footer">
                <button
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
                  @click="deleteFavorite(index)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import axios from "axios";
export default {
  components: {
    CommonHeader,
  },
  props: ["id"],
  data() {
    return {
      userReservedRestaurants: [],
      newUserReservedRestaurants: [],
      userFavoriteRestaurants: [],
      show: true,
    };
  },
  methods: {
    deleteReservation(index) {
      axios
        .request({
          method: "delete",
          url:
            "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" +
            this.userReservedRestaurants[index].id +
            "/reservations",
          data: { user_id: this.$store.state.user.id },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
    deleteFavorite(index) {
      axios
        .request({
          method: "delete",
          url:
            "https://stormy-lake-54158.herokuapp.com/api/v1/shops/" +
            this.userFavoriteRestaurants[index].id +
            "/favorites",
          data: { user_id: this.$store.state.user.id },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },

    async getUserReservedShops() {
      let data = [];
      await axios
        .get(
          "https://stormy-lake-54158.herokuapp.com/api/v1/users/" +
            this.$store.state.user.id +
            "/reservations"
        )
        .then((response) => {
          data.push(response.data);
          this.userReservedRestaurants = data[0].data;
          console.log(this.userReservedRestaurants);

          for (let i = 0; i < this.userReservedRestaurants.length; i++) {
            const reservationLists = this.userReservedRestaurants[i].reservations;
            const checkReservation = reservationLists.some(
              (res) => res.user_id === this.$store.state.user.id
            );
            if (checkReservation) {
              const reservationData = reservationLists.find((res) => res.user_id === this.$store.state.user.id);
              this.newUserReservedRestaurants.push({
                id: this.userReservedRestaurants[i].id,
                shop_name: this.userReservedRestaurants[i].shop_name,
                reservation_date: reservationData.reservation_date,
                reservation_time: reservationData.reservation_time,
                reservation_number: reservationData.reservation_number,
              });
            }
          }
          console.log(this.newUserReservedRestaurants);
        });
    },
    async getUserFavoriteShops() {
      let data = [];
      await axios
        .get(
          "https://stormy-lake-54158.herokuapp.com/api/v1/users/" +
            this.$store.state.user.id +
            "/favorites"
        )
        .then((response) => {
          data.push(response.data);
          this.userFavoriteRestaurants = data[0].data;
          console.log(this.userFavoriteRestaurants);
        });
    },
  },
  created() {
    this.getUserReservedShops();
    this.getUserFavoriteShops();
  },
};
</script>


<style scoped>
button {
  font-size: 1.2rem;
  width: 80px;
  padding: 4px 0px;
  margin: 10px 0 0 0;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  cursor: pointer;
}

h1 {
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

.contents h2 {
  font-size: 1.8rem;
  margin: 15px 0;
}

.card {
  width: 50%;
  padding-bottom: 20px;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card p {
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

.card-shop p {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
}

.card-footer {
  display: flex;
  justify-content: space-around;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}

table {
  margin: 0 0 0 20px;
}

td {
  text-align: left;
  padding: 10px 0 0 0;
  font-size: 1rem;
  color: white;
}

td:first-child {
  padding-right: 10px;
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
</style>