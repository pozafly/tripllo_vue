<template>
  <div id="app">
    <Noti />
    <router-view></router-view>
    <spinner :loading="LoadingStatus"></spinner>
  </div>
</template>

<script>
import Spinner from '@/components/common/Spinner.vue';
import Noti from '@/components/common/Noti';
import bus from '@/utils/bus.js';

export default {
  components: { Spinner, Noti },
  data() {
    return {
      LoadingStatus: false,
    };
  },
  methods: {
    startSpinner() {
      this.LoadingStatus = true;
    },
    endSpinner() {
      this.LoadingStatus = false;
    },
  },
  created() {
    console.log('API_URL 확인용');
    console.log(process.env.VUE_APP_API_URL);
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() {
    bus.$off('start:spinner');
    bus.$off('end:spinner');
  },
};
</script>

<style>
@import './css/common.scss';
</style>
