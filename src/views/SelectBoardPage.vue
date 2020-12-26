<template>
  <div>
    <div>
      select
    </div>
    <div>
      <pre>{{ boardList }}</pre>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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
