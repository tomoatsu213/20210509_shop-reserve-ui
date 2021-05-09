<template>
  <div>
    <CommonHeader />
    <div class="container">
      <div class="contents">
        <div class="card-space">
          <h2 class="shop-name">仙人</h2>
          <div class="card-shop">
            <img
              src="https://coachtech-matter.s3-ap-northeast-1.amazonaws.com/image/sushi.jpg"
              alt="#"
              width="350px"
              height="auto"
            />
            <p>#東京都 #寿司</p>
            <p>
              料理長厳選の食材から作る寿司を用いたコースをぜひお楽しみください。食材・味・価格、お客様の満足度を徹底的に追及したお店です。特別な日のお食事、ビジネス接待まで気軽に使用することができます。
            </p>
          </div>
        </div>
      </div>
      <div class="contents content-right">
        <div class="card">
          <div class="table-header">
            <div class="table-title">
              <p>予約</p>
              <form action="">
                <input type="date" min="2021-04-30" />
                <select name="time" id="time">
                  <option value="" disabled selected hidden>
                    時刻を選択してください
                  </option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
                <select name="number" id="number">
                  <option value="" disabled selected hidden>
                    人数を選択してください
                  </option>
                  <option value="1">1人</option>
                  <option value="2">2人</option>
                  <option value="3">3人</option>
                </select>
              </form>
            </div>
          </div>
          <table>
            <tr>
              <td>Shop</td>
              <td>仙人</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>2021-04-01</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>17:00</td>
            </tr>
            <tr>
              <td>Number</td>
              <td>1人</td>
            </tr>
          </table>
          <button @click="$router.push('/done')">予約する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
export default {
  components: {
    CommonHeader,
  },
  props: ["id"],
};
</script>


<style scoped>
button {
  text-align: center;
  font-size: 1.2rem;
  width: 100%;
  padding: 10px 0px;
  color: #fff;
  background-color: rgb(53, 96, 246);
  border: none;
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
  width: 50%;
}

.content-right {
  position: absolute;
  top: 20px;
  left: 50%;
}

input {
  display: block;
  width: 40%;
  margin: 0 0 10px 20px;
}

select {
  display: block;
  width: 80%;
  margin: 0 0 10px 20px;
}

.card {
  width: 300px;
  background-color: rgb(88, 120, 238);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
}
.card p {
  font-size: 1.2rem;
  color: white;
  padding: 15px;
}

table {
  margin: 0 0 150px 20px;
  width: 80%;
  height: 100px;
  background-color: rgb(1, 146, 243);
  border-radius: 5px;
}

td {
  text-align: left;
  padding: 8px 0;
  font-size: 1rem;
  color: white;
}

td:first-child {
  padding-right: 5px;
  padding-left: 10px;
}

.contents h2 {
  font-size: 1.8rem;
  margin: 15px 0;
}

.card-shop {
  width: 350px;
  padding-bottom: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
}

.card-shop p {
  color: rgb(0, 0, 0);
  padding: 10px 0 2px 0;
  line-height: 15px;
}

.shop-name {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>