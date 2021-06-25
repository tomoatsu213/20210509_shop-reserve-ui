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
        <ShopStar :value="restaurants"></ShopStar>
        <p class="card-shop-text">{{ restaurants.shop_profile }}</p>
      </div>
    </div>
    <div class="content-right">
      <div class="card-reserve">
        <AddReservation
          :restaurants="restaurants"
          :timeLists="timeLists"
          :numberLists="numberLists"
        ></AddReservation>
      </div>
    </div>
    <div class="content-review">
      <h2 class="review-title">お店のユーザーレビュー</h2>
      <div
        class="card-shop-review"
        v-for="value in restaurantReviews"
        :key="value.id"
      >
        <p>評価日時：{{ value.created_at }}</p>
        <ShopStar :value="value"></ShopStar>
        <p class="user_comment">{{ value.user_comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShopStar from "./shopInformation/review/ShopStar";
import AddReservation from "./reservation/AddReservation";
export default {
  components: {
    ShopStar,
    AddReservation,
  },
  props: ["id"],

  data() {
    return {
      restaurants: [],
      restaurantReviews: [],
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
    getShop() {
      let shopData = [];
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .get("https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + this.id)
        .then((response) => {
          shopData.push(response.data);
          this.restaurants = shopData[0].data;
          console.log(this.restaurants);
        })
        .catch(() => {
          this.$store.dispatch("secondLogin");
        });
      let shopReviewData = [];
      axios
        .get("https://stormy-lake-54158.herokuapp.com/api/v1/shops/" + this.id + "/reviews")
        .then((response) => {
          shopReviewData.push(response.data);
          this.restaurantReviews = shopReviewData[0].data;
          console.log(this.restaurantReviews);
        });
    },
  },
  created() {
    this.getShop();
    this.getTimeLists();
    this.getNumberLists();
  },
};
</script>


<style scoped>
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

.content-review {
  margin-top: 20px;
}

.review-title {
  font-size: 1.6rem;
  margin-bottom: 10px;
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
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 0;
}
</style>