<template>
  <div class="container">
    <CommonHeader />
    <main class="main-wrap">
      <section class="notfound-wrap">
        <awesome icon="skull" class="notfound-icon" />
        <h2 class="notfound-text">해당 페이지를 찾을 수 없습니다.</h2>
        <a href="" @click.prevent="goBack">메인페이지로 이동</a>
      </section>
    </main>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/header/CommonHeader.vue';

export default {
  components: {
    CommonHeader,
  },

  methods: {
    goBack() {
      this.$router.push(`/main`);
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  min-height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
  .main-wrap {
    height: 100%;
    .notfound-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      width: 100%;
      height: 100%;
      .notfound-icon {
        display: block;
        width: 400px;
        font-size: 155px;
        margin-bottom: 70px;
      }
      .notfound-text {
        font-size: 20px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
