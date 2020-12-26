<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <div class="main-wrap">
      <main>
        <router-view></router-view>
      </main>
      <aside>
        <a href="">Privacy Policy</a>
      </aside>
    </div>
    <footer>
      <div class="footer-wrap">
        <i class="fas fa-suitcase"></i>
        <span> Tripllo</span>
        <span>
          Coded and maintained with ❤️ by
          <a href="https://github.com/pozafly" target="_sub">pozafly</a> © 2020
        </span>
      </div>
    </footer>
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" alt="" />
      <img class="back item2" src="@/assets/user/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$Kakao.init();
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    font-family: 'Pacifico', cursive;
    color: #0282ce;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    margin: 2rem;
    align-items: center;
    .fas.fa-suitcase {
      font-size: 3rem;
      padding-right: 0.3rem;
    }
  }
  .main-wrap {
    margin: 0 auto;
    margin-top: -4rem;
    padding-top: 4rem;
    box-sizing: border-box;
    height: 100%;
    main {
      flex-direction: column;
      align-items: center;
      display: block;
      max-width: 585px;
      position: relative;
    }
    aside {
      position: relative;
      text-align: center;
      margin-top: 1.6rem;
      font-size: 0.9rem;
    }
  }
  footer {
    text-align: center;
    .footer-wrap {
      padding: 0.3rem;
    }
  }
  .back {
    position: fixed;
    bottom: 2rem;
    width: 30rem;
    z-index: -1;
    .item1 {
      left: 0;
    }
    .item2 {
      right: 0;
    }
  }
}
</style>
