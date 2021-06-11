<template>
  <div>
    <div class="search-container">
      <form
        class="form-search"
        id="form-search"
        action="http://localhost:8080/"
        method="get"
      >
        <select class="select" id="area" name="area" v-model="selectedArea">
          <option disabled value="">Please select area</option>
          <option v-for="(value, id) in shopsAreas" :key="id">
            {{ value.shop_area }}
          </option>
        </select>
        <select class="select" id="genre" name="genre" v-model="selectedGenre">
          <option disabled value="">Please select genre</option>
          <option v-for="(value, id) in shopsGenres" :key="id">
            {{ value.shop_genre }}
          </option>
        </select>
        <button type="submit" id="search-button">
          <font-awesome-icon icon="search" class="fa-lg icon-search" />
        </button>
        <input
          class="input"
          id="search"
          name="search"
          type="search"
          placeholder="Search..."
          v-model="keyword"
        />
      </form>
    </div>
    <div class="container">
      <div class="contents">
        <div
          class="card-space"
          v-for="(value, index) in filteredRestaurants"
          :key="value.id"
        >
          <div class="card-shop">
            <img :src="value.shop_image" alt="#" width="180px" height="auto" />
            <p class="card-shop-name card-shop-text">{{ value.shop_name }}</p>
            <p class="card-shop-text">
              #{{ value.shop_area }} #{{ value.shop_genre }}
            </p>
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
                @click="deleteFavorite(index, value.id)"
                v-if="value.check_favorite"
              />
              <font-awesome-icon
                icon="heart"
                class="fa-2x icon-favorite-none"
                @click="addFavorite(index, value.id)"
                v-else
              />
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
  data() {
    return {
      restaurants: [],
      shopsAreas: [],
      shopsGenres: [],
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
    addFavorite(index, id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .put("http://127.0.0.1:8000/api/v1/shops/" + id + "/favorites")
        .then((response) => {
          console.log(response);
          this.filteredRestaurants[index].check_favorite = true;
        });
    },
    deleteFavorite(index, id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      axios
        .request({
          method: "delete",
          url: "http://127.0.0.1:8000/api/v1/shops/" + id + "/favorites",
        })
        .then((response) => {
          console.log(response);
          this.filteredRestaurants[index].check_favorite = false;
        });
    },
    async getShops() {
      let shopData = [];
      let shopsAreas = [];
      let shopsGenres = [];
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.accessToken;
      await axios
        .get("http://127.0.0.1:8000/api/v1/shops")
        .then((response) => {
          shopData.push(response.data);
          this.restaurants = shopData[0].data;
          console.log(this.restaurants);
          this.$store.dispatch("secondLogin");
        })
        .catch(() => {
          this.$store.commit("accessToken", null);
          this.$store.commit("auth", false);
          this.$router.replace("/login");
        });

      await axios
        .get("http://127.0.0.1:8000/api/v1/shops/areas")
        .then((response) => {
          shopsAreas.push(response.data);
          this.shopsAreas = shopsAreas[0].data;
          console.log(this.shopsAreas);
        });

      await axios
        .get("http://127.0.0.1:8000/api/v1/shops/genres")
        .then((response) => {
          shopsGenres.push(response.data);
          this.shopsGenres = shopsGenres[0].data;
          console.log(this.shopsGenres);
        });
    },
  },
  created() {
    this.getShops();
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

.card-shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}

.card-shop-text {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
}

.icon-favorite {
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.icon-favorite-none {
  color: rgb(206, 206, 206);
  cursor: pointer;
  padding: 15px 0 0 0;
}

.card-footer {
  display: flex;
  justify-content: space-around;
}

.search-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.form-search {
  display: flex;
  justify-content: end;
  padding: 2px 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}

.select {
  border: none;
  outline: none;
  width: 150px;
}

.input {
  appearance: none;
  border: none;
  outline: none;
  width: 200px;
}

#search-button {
  color: rgb(180, 180, 180);
  background-color: #fff;
  cursor: pointer;
  border: none;
  width: 30px;
  padding: 0 0 10px 0;
}

.star {
  margin-left: 20px;
  font-size: 18px;
  color: red;
  font-weight: bold;
}
</style>