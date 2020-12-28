<template>
  <div class="page">
    <header>
      <ul class="header-wrap" @click="goMain">
        <li><i class="fas fa-suitcase"></i></li>
        <li><span class="title">Tripllo</span></li>
      </ul>
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
      <i class="fas fa-suitcase footer-item"></i>
      <span class="footer-item">
        Tripllo Coded and maintained with ❤️ by
        <a href="https://github.com/pozafly" target="_sub" class="footer-item">
          pozafly
        </a>
        © 2020
      </span>
    </footer>
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" alt="" />
      <img class="back item2" src="@/assets/user/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      console.log('dfff');
      this.$router.push('/main');
    },
  },
  created() {
    this.$Kakao.init();
  },
};
</script>

<style scoped lang="scss">
/* * {
  border: 1px solid black;
} */
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
    align-items: center;
    .header-wrap {
      padding: 0.1rem;
      display: flex;
      position: relative;
      cursor: pointer;
      .fas.fa-suitcase {
        font-size: 3rem;
        padding-right: 0.3rem;
      }
    }
  }
  .main-wrap {
    margin: 0 auto;
    margin-top: -6.1rem;
    padding-top: 6.1rem;
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
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .fas.fa-suitcase.footer-item {
      margin-right: 3px;
    }
    .footer-item {
      margin-right: 3px;
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
