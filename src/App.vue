<template>
  <div id="app">
    <div>
      <div class="header flex">
        <div class="nav" @click="openMenu">
          <a class="menu">
            <span class="line-top"></span>
            <span class="line-middle"></span>
            <span class="line-bottom"></span>
          </a>
        </div>
        <div class="left">
          <h2 @click="$router.push('/')">Rese</h2>
        </div>
      </div>
      <div class="items" v-if="show">
        <p @click="$router.push('/my-page')">Mypage</p>
        <p @click="$router.push('/')">Shops</p>
        <p @click="$router.push('/register')">Registration</p>
        <p @click="$router.push('/login')">Login</p>
        <p @click="$store.dispatch('logout')">Logout</p>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    openMenu() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
/*
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com
Twitter: @rich_clark
*/

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

html {
  font-size: 75.0%;
}
</style>

<style scoped>
.header {
  margin: 20px 0 0 20px;
  font-size: 2rem;
  color: rgb(53, 96, 246);
}

.nav {
  width: 35px;
  background-color: rgb(53, 96, 246);
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgb(163, 163, 163);
  cursor: pointer;
}

.menu,
.menu span {
  display: inline-block; /* spanタグはinline要素なのでblock要素を加える */
}

.menu {
  position: relative; /* 子要素の位置の基準を決める */
  width: 30px;
  height: 26px;
}

.line-top,
.line-middle,
.line-bottom {
  position: absolute; /* 親要素（.menu）の位置にしたがって上下左右位置指定 */
  left: 5px;
  height: 2px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
}

.line-top {
  top: 7px; /* relativeを当てた要素の上から7px */
  width: 50%;
}

.line-middle {
  top: 13px; /* relativeを当てた要素の上から13px */
  width: 80%;
}

.line-bottom {
  top: 19px; /* relativeを当てた要素の上から19px */
  width: 20%;
}
.left {
  cursor: pointer;
  padding: 5px 0 0 10px;
}
.flex {
  display: flex;
  justify-content: start;
}

.items {
  position: absolute;
  left: 0px;
  top: 40px;
  margin: 10px 0 0 20px;
  width: 150px;
  line-height: 25px;
  font-size: 2rem;
  color: rgb(255, 255, 255);
  background-color: rgb(61, 90, 255);
  opacity: 0.9;
  cursor: pointer;
}

.items p {
  border-bottom: 1px solid rgb(255, 255, 255);
  padding: 5px;
}
</style>