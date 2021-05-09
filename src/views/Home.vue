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
        <select id="area" name="area">
          <option value="All area">All area</option>
          <option value="tokyo">東京都</option>
        </select>
        <select id="genre" name="genre">
          <option value="All genre">All genre</option>
          <option value="sushi">寿司</option>
        </select>
        <button type="submit" id="search-button">
          <font-awesome-icon icon="search" class="fa-lg icon-search" />
        </button>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Search..."
        />
      </form>
    </div>
    <div class="container">
      <div class="contents">
        <div class="card-space" v-for="(value, index) in shops" :key="index">
          <div class="card-shop">
            <img src="value.shop_image" alt="#" width="180px" height="auto" />
            <p class="shop-name">{{ value.shop_name }}</p>
            <p>#{{ value.shop_area }} #{{ value.shop_genre }}</p>
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
        <div class="card-space">
          <div class="card-shop">
            <img
              src="https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"
              alt="#"
              width="180px"
              height="auto"
            />
            <p class="shop-name">仙人</p>
            <p>#東京都 #寿司</p>
            <div class="card-footer">
              <button @click="$router.push('/detail/id')">詳しくみる</button>
              <font-awesome-icon icon="heart" class="fa-2x icon-favorite" />
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
      shops: [],
      path: true,
      profile: true,
      show: true,
    };
  },
  methods: {
    fav(index) {
      const result = this.shops[index].favorite.some((value) => {
        return value.user_id == this.$store.state.user.id;
      });
      if (result) {
        this.shops[index].favorite.forEach((element) => {
          if (element.user_id == this.$store.state.user.id) {
            axios({
              method: "delete",
              url: "http://127.0.0.1:8000/api/v1/{user_id}/favorites",
              data: {
                shop_id: this.shops[index].item.id,
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
            shop_id: this.shops[index].item.id,
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
      const shops = await axios.get("http://127.0.0.1:8000/api/v1/shops");
      for (let i = 0; i < shops.data.data.length; i++) {
        await axios
          .get("http://127.0.0.1:8000/api/v1/shops" + shops.data.data[i].id)
          .then((response) => {
            data.push(response.data);
          });
      }
      this.shops = data;
      console.log(this.shops);
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
  width: 80px;
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