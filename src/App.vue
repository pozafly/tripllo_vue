<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$root);
    // this.$root.log = function log() {
    //   for (let i = 0; i < arguments.length; i += 1) {
    //     if (typeof arguments[i] === 'object') {
    //       try {
    //         arguments[i] = JSON.parse(JSON.stringify(arguments[i]));
    //       } catch (e) {
    //         console.error(e);
    //       }
    //     }
    //   }
    //   console.log(...arguments);
    // };
  },
};
</script>

<style>
@import './css/common.scss';
</style>
