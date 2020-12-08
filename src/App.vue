<template>
  <div id="app">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import MainPage from '@/views/MainPage.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  components: {
    Footer,
  },
  created() {},
};
</script>

<style>
@import './css/common.css';
</style>
