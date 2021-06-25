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
          <ReservedLists :value="value" :id="id"></ReservedLists>
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
              <ShopInformation :value="value"></ShopInformation>
              <ShopStar :value="value"></ShopStar>
              <div class="card-footer">
                <DetailButton :id="value.id"></DetailButton>
                <FavoriteButton :value="value"></FavoriteButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="visit-shop">
      <h2 class="contents-title">訪れた店舗</h2>
      <div class="content-right">
        <div
          class="card-space"
          v-for="(value, id) in userVisitedRestaurants"
          :key="id"
        >
          <div class="card-shop">
            <ShopInformation :value="value"></ShopInformation>
            <p class="review card-shop-text">
              {{ $store.state.user.user_name }}さんの評価
            </p>
            <EditShopStar :value="value"></EditShopStar>
            <input
              class="user-comment"
              type="text"
              v-model="value.user_comment"
            />
            <div class="card-footer">
              <DetailButton :id="value.id"></DetailButton>
              <EditReviewButton :value="value"></EditReviewButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ReservedLists from "./reservation/ReservedLists";
import ShopInformation from "./shopInformation/ShopInformation";
import ShopStar from "./shopInformation/review/ShopStar";
import EditShopStar from "./shopInformation/review/EditShopStar";
import DetailButton from "./shopInformation/DetailButton";
import FavoriteButton from "./shopInformation/FavoriteButton";
import EditReviewButton from "./shopInformation/review/EditReviewButton";
export default {
  components: {
    ReservedLists,
    ShopInformation,
    ShopStar,
    EditShopStar,
    DetailButton,
    EditReviewButton,
    FavoriteButton,
  },
  data() {
    return {
      userReservedRestaurants: [],
      userFavoriteRestaurants: [],
      userVisitedRestaurants: [],
      reservedItems: [],
    };
  },
  methods: {
    async getUsersShops() {
      await axios
        .request({
          method: "POST",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops/visits",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {
          this.$store.dispatch("secondLogin");
        });

      let favoriteItems = [];
      await axios
        .request({
          method: "GET",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/users/favorites",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          favoriteItems.push(response.data);
          this.userFavoriteRestaurants = favoriteItems[0].data;
        });
      let reservedItems = [];
      axios
        .request({
          method: "GET",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/users/reservations",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          reservedItems.push(response.data);
          this.userReservedRestaurants = reservedItems[0].data;
          console.log(this.userReservedRestaurants);
        });
      let visitItems = [];
      axios
        .request({
          method: "GET",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/users/visits",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          visitItems.push(response.data);
          this.userVisitedRestaurants = visitItems[0].data;
        });
    },
  },
  created() {
    this.getUsersShops();
  },
};
</script>


<style scoped>
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

.card-shop-text {
  font-size: 1rem;
  padding: 10px 0 2px 15px;
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

.visit-shop {
  margin: 40px 0 0 40px;
}

.review {
  color: rgb(255, 109, 89);
  font-size: 12px;
}

.user-comment {
  margin-left: 15px;
}
</style>