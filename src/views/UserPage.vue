<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <aside>
      <a href="">Privacy Policy</a>
    </aside>
    <Footer></Footer>
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" alt="" />
      <img class="back item2" src="@/assets/user/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue';

export default {
  components: {
    Footer,
  },
  created() {
    this.$Kakao.init();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
/* * {
  border: 1px solid black;
} */
.page {
  display: flex;
  flex-direction: column;
  height: 96%;
}
header {
  font-family: 'Pacifico', cursive;
  color: #0282ce;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 2rem;
  align-items: center;
}
header .fas.fa-suitcase {
  font-size: 3rem;
  padding-right: 0.3rem;
}
main {
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  flex-direction: column;
  align-items: center;
  display: block;
  max-width: 585px;
  margin: 0 auto;
  position: relative;
}
.page aside {
  position: relative;
  text-align: center;
  margin-top: 1.6rem;
  font-size: 0.9rem;
}
.back {
  position: fixed;
  bottom: 2rem;
  width: 30rem;
  z-index: -1;
}
.back .item1 {
  left: 0;
}
.back .item2 {
  right: 0;
}
footer {
  text-align: center;
}
</style>
