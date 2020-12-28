<template>
  <div>
    <Header />
    <pre>{{ boardList }}</pre>
  </div>
</template>

<script>
import Header from '@/components/common/Header';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Header,
  },
  computed: {
    ...mapState(['boardList']),
  },
  methods: {
    ...mapActions(['READ_BOARD_LIST']),
  },
  created() {
    this.READ_BOARD_LIST('pain103');
  },
};
</script>

<style></style>
