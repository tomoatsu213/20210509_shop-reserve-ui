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
          v-for="(value, index) in restaurants"
          :key="index"
        >
          <div class="card-shop">
            <img :src="value.shop_image" alt="#" width="180px" height="auto" />
            <p class="shop-name">{{ value.shop_name }}</p>
            <p v-if="restaurants">
              #{{ value.areas[0].shop_area }} #{{ value.genres[0].shop_genre }}
            </p>
            <div class="card-footer">
              <button
                @click="
                  $router.push({
                    path: '/detail/' + value.item.id,
                    params: { id: value.item.id },
                  })
                "
              >
                詳しくみる
              </button>
              <font-awesome-icon
                icon="heart"
                class="fa-2x icon-favorite-none"
                @click="fav(index)"
                v-if="show"
              />
              <font-awesome-icon
                icon="heart"
                class="fa-2x icon-favorite"
                @click="fav(index)"
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
      // restaurants_data:[],
      image: "value.shop_image",
      // path: true,
      // profile: true,
      show: true,
      selected_area: "",
      selected_genre: "",
      areas: [
        { name: "All areas", value: "All areas" },
        { name: "東京", value: "tokyo" },
        { name: "埼玉", value: "saitama" },
      ],
      genres: [
        { name: "All genres", value: "All genres" },
        { name: "寿司", value: "sushi" },
        { name: "ラーメン", value: "ramen" },
      ],
      search: "",
    };
  },
  // computed(){
  //    return this.restaurants = JSON.parse(this.restaurants_data.data);
  // },
  methods: {
    fav(index) {
      const result = this.restaurants[index].favorite.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      if (result) {
        this.restaurants[index].favorite.forEach((element) => {
          if (element.user_id == this.$store.state.user.id) {
            axios({
              method: "delete",
              url: "http://127.0.0.1:8000/api/v1/{user_id}/favorites",
              data: {
                shop_id: this.restaurants[index].item.id,
                user_id: this.$store.state.user.id,
              },
            }).then((response) => {
              console.log(response);
              this.show = !this.show;
              this.$router.go({
                path: this.$router.currentRoute.path,
                force: true,
              });
            });
          }
        });
      } else {
        axios
          .put("http://127.0.0.1:8000/api/v1/{user_id}/favorites", {
            shop_id: this.restaurants[index].item.id,
            user_id: this.$store.state.user.id,
          })
          .then((response) => {
            console.log(response);
            this.show = !this.show;
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    },
    async getShops() {
      let data = [];
      await axios.get("http://127.0.0.1:8000/api/v1/shops").then((response) => {
        data.push(response.data);
        this.restaurants = data[0].data;
        console.log(this.restaurants);
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