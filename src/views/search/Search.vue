<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent>
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
      <input
        class="input"
        id="search"
        name="search"
        type="search"
        placeholder="Search..."
        v-model="keyword"
      />
      <button type="submit" class="search-button" @click="sendSearchItems">
        <font-awesome-icon icon="search" class="fa-lg icon-search" />
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      shopsAreas: [],
      shopsGenres: [],
      selectedArea: "",
      selectedGenre: "",
      keyword: "",
    };
  },
  methods: {
    sendSearchItems() {
      this.$emit(
        "getSearchItems",
        this.selectedArea,
        this.selectedGenre,
        this.keyword
      );
    },
    async getSearchItems() {
      let shopsAreas = [];
      let shopsGenres = [];
      await axios
        .request({
          method: "get",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops/areas",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          shopsAreas.push(response.data);
          this.shopsAreas = shopsAreas[0].data;
          console.log(this.shopsAreas);
        });

      await axios
        .request({
          method: "get",
          url: "https://stormy-lake-54158.herokuapp.com/api/v1/shops/genres",
          headers: {
            ["Authorization"]: "Bearer " + this.$store.state.accessToken,
          },
        })
        .then((response) => {
          shopsGenres.push(response.data);
          this.shopsGenres = shopsGenres[0].data;
          console.log(this.shopsGenres);
        });
    },
  },
  created() {
    this.getSearchItems();
  },
};
</script>

<style scoped>
.search-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.search-form {
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

.search-button {
  color: rgb(180, 180, 180);
  background-color: #fff;
  cursor: pointer;
  border: none;
  width: 30px;
  padding: 5px 0 5px 0;
}
</style>