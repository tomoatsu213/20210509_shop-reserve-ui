<template>
  <div>
    <CommonHeader />
    <h1>Userさん</h1>
    <div class="container">
      <div class="contents content-left">
        <h2>予約状況</h2>
        <div class="card">
          <div class="table-header">
            <div class="table-title">
              <font-awesome-icon icon="clock" class="fa-2x icon-clock" />
              <p>予約1</p>
            </div>
            <font-awesome-icon icon="window-close" class="fa-2x icon-cancel" />
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
        </div>
      </div>
      <div class="contents">
        <h2>お気に入り店舗</h2>
        <div class="content-right">
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
              <div class="table-footer">
                <button>詳しくみる</button>
                <font-awesome-icon icon="heart" class="fa-2x icon-favorite" />
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
              <div class="table-footer">
                <button>詳しくみる</button>
                <font-awesome-icon icon="heart" class="fa-2x icon-favorite" />
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
              <div class="table-footer">
                <button>詳しくみる</button>
                <font-awesome-icon icon="heart" class="fa-2x icon-favorite" />
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
export default {
  components: {
    CommonHeader,
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