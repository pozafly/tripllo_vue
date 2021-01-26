<template>
  <div class="intro-wrap">
    <header>
      <ul class="header-wrap">
        <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
        <li><span class="title">Tripllo</span></li>
      </ul>
    </header>
    <main>
      <p class="main-text">
        Tripllo는 이슈트래커인 웹기반 Trello 어플리케이션을 Clone한
        어플리케이션입니다. Trello는 팀이보다 협력 적으로 작업하고 더 많은
        작업을 수행 할 수 있도록 지원합니다. Trello의 보드, 목록 및 카드를
        사용하면 팀이 재미 있고 유연하며 보람있는 방식으로 프로젝트를 구성하고
        우선 순위를 지정할 수 있습니다.
      </p>
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
  .main-text {
    color: #fff;
  }
}
</style>
