<template>
  <div id="app">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
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
