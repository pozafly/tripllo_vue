<template>
  <div class="page">
    <header>
      <ul class="header-wrap" @click="goMain">
        <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
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
    <Footer />
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" alt="" />
      <img class="back item2" src="@/assets/user/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer';

export default {
  components: { Footer },
  methods: {
    goMain() {
      this.$router.push('/main');
    },
  },
  created() {
    this.$loadScript(`https://developers.kakao.com/sdk/js/kakao.js`).then(
      () => {
        if (!window.Kakao.isInitialized()) {
          this.$Kakao.init();
        }
      },
    );
  },
};
</script>

<style scoped lang="scss">
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
      margin: 32px 0;
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
