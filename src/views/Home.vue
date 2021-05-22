<template>
  <div>
    <CommonHeader />
    <div class="search-container">
      <form
        class="form-search"
        id="form-search"
        action="http://localhost:8080/"
        method="get"
      >
        <select id="area" name="area" v-model="selected_area">
          <option disabled value="">Please select area</option>
          <option v-for="area in areas" :key="area.id" :value="area.value">
            {{ area.name }}
          </option>
        </select>
        <select id="genre" name="genre" v-model="selected_genre">
          <option disabled value="">Please select genre</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.value">
            {{ genre.name }}
          </option>
        </select>
        <button type="submit" id="search-button">
          <font-awesome-icon icon="search" class="fa-lg icon-search" />
        </button>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Search..."
          v-model="search"
        />
      </form>
    </div>
    <div class="container">
      <div class="contents">
        <div
          class="card-space"
          v-for="(value, index) in newRestaurants"
          :key="index"
        >
          <div class="card-shop">
            <img :src="value.shop_image" alt="#" width="180px" height="auto" />
            <p class="shop-name">{{ value.shop_name }}</p>
            <p>#{{ value.shop_area }} #{{ value.shop_genre }}</p>
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
                v-if="value.check_favorite"
              />
              <font-awesome-icon
                icon="heart"
                class="fa-2x icon-favorite-none"
                @click="addFavorite(index)"
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
import CommonHeader from "../components/CommonHeader";
import axios from "axios";
export default {
  components: {
    CommonHeader,
  },
  props: ["id"],
  data() {
    return {
      restaurants: [],
      newRestaurants: [],
      // show: true,
      selected_area: "",
      selected_genre: "",
      areas: [
        { name: "All areas", value: "All areas" },
        { name: "東京都", value: "Tokyo" },
        { name: "大阪府", value: "Osaka" },
        { name: "福岡県", value: "Fukuoka" },
      ],
      genres: [
        { name: "All genres", value: "All genres" },
        { name: "寿司", value: "sushi" },
        { name: "焼肉", value: "yakiniku" },
        { name: "居酒屋", value: "izakaya" },
        { name: "イタリアン", value: "italian" },
        { name: "ラーメン", value: "ramen" },
      ],
      search: "",
    };
  },
  methods: {
    addFavorite(index) {
      axios
        .put(
          "http://127.0.0.1:8000/api/v1/shops/" +
            this.restaurants[index].id +
            "/favorites",
          {
            user_id: this.$store.state.user.id,
          }
        )
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
            "http://127.0.0.1:8000/api/v1/shops/" +
            this.restaurants[index].id +
            "/favorites",
          data: { user_id: this.$store.state.user.id },
        })
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: false,
          });
        });
    },

    async getShops() {
      let data = [];
      await axios.get("http://127.0.0.1:8000/api/v1/shops").then((response) => {
        data.push(response.data);
        this.restaurants = data[0].data;
        console.log(this.restaurants);

        for (let i = 0; i < this.restaurants.length; i++) {
          let favoriteLists = this.restaurants[i].favorites;
          const checkFavorite = favoriteLists.some(
            (res) => res.user_id === this.$store.state.user.id
          );
          this.newRestaurants.push({
            id: this.restaurants[i].id,
            shop_name: this.restaurants[i].shop_name,
            shop_image: this.restaurants[i].shop_image,
            shop_area: this.restaurants[i].areas[0].shop_area,
            shop_genre: this.restaurants[i].genres[0].shop_genre,
            check_favorite: checkFavorite,
          });
        }
        console.log(this.newRestaurants);
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

h1 {
  position: absolute;
  left: 52%;
  font-size: 2rem;
  margin: 50px 0 0 0;
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

.card-shop p {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 15px;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
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

select {
  border: none;
  outline: none;
  width: 150px;
}

input {
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
</style>