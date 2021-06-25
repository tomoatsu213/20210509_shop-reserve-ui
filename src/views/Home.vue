<template>
  <div>
    <Search @getSearchItems="showSearchItems"></Search>
    <div class="container">
      <div class="contents">
        <div
          class="card-space"
          v-for="value in filteredRestaurants"
          :key="value.id"
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
</template>

<script>
import axios from "axios";
import Search from "./search/Search";
import ShopInformation from "./shopInformation/ShopInformation";
import ShopStar from "./shopInformation/review/ShopStar";
import DetailButton from "./shopInformation/DetailButton";
import FavoriteButton from "./shopInformation/FavoriteButton";
export default {
  components: {
    Search,
    ShopStar,
    ShopInformation,
    DetailButton,
    FavoriteButton,
  },
  data() {
    return {
      restaurants: [],
      selectedArea: "",
      selectedGenre: "",
      keyword: "",
    };
  },
  computed: {
    filteredRestaurants() {
      let restaurants = [];
      for (let i in this.restaurants) {
        let restaurant = this.restaurants[i];
        if (
          restaurant.shop_area.indexOf(this.selectedArea) !== -1 &&
          restaurant.shop_genre.indexOf(this.selectedGenre) !== -1 &&
          restaurant.shop_name.indexOf(this.keyword) !== -1
        ) {
          restaurants.push(restaurant);
        }
      }
      return restaurants;
    },
  },
  methods: {
    showSearchItems(selectedArea, selectedGenre, keyword) {
      this.selectedArea = selectedArea;
      this.selectedGenre = selectedGenre;
      this.keyword = keyword;
    },
    async getShops() {
      let shopData = [];
      await axios
        .request({
          method: "get",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops",
          headers: {
            ["Authorization"]: "Bearer" + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          shopData.push(response.data);
          this.restaurants = shopData[0].data;
          console.log(this.restaurants);
        })
        .catch(() => {
          this.$store.dispatch("secondLogin");
        });
    },
  },
  created() {
    this.getShops();
  },
};
</script>


<style scoped>
.container {
  margin: 30px 20px;
  width: 95%;
}

.contents {
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
}

.card-space {
  margin: 0 10px 10px 0;
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
</style>