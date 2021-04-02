<template>
  <div id="app">
    <AlertNotification />
    <router-view></router-view>
    <LoadingSpinner :loading="LoadingStatus"></LoadingSpinner>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import AlertNotification from '@/components/common/AlertNotification.vue';
import bus from '@/utils/bus.js';

export default {
  components: {
    LoadingSpinner,
    AlertNotification,
  },
  data() {
    return {
      LoadingStatus: false,
    };
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

  methods: {
    startSpinner() {
      this.LoadingStatus = true;
    },
    endSpinner() {
      this.LoadingStatus = false;
    },
  },
};
</script>

<style>
@import './css/common.scss';
</style>
