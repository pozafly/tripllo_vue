<template>
  <div class="intro-wrap">
    <header>
      <ul class="header-wrap" @click="goMain">
        <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
        <li><span class="title">Tripllo</span></li>
      </ul>
    </header>
    <main>
      <p>Tripllo는</p>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/common/Footer';

export default {
  components: { Footer },
};
</script>

<style scoped lang="scss">
.intro-wrap {
  height: 100%;
  background: #06beb6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0979bf,
    #4f68c5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0979bf,
    #4f68c5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  header {
    font-family: 'Pacifico', cursive;
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    align-items: center;
    .header-wrap {
      margin: 32px 0;
      padding: 0.1rem;
      display: flex;
      position: relative;
      .fas.fa-suitcase {
        font-size: 3rem;
        padding-right: 0.3rem;
      }
    }
  }
}
</style>
