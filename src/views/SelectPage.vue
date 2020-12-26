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
  data() {
    return {
      board: [],
    };
  },
  computed: {
    ...mapState(['boardList']),
  },
  methods: {
    ...mapActions(['READBOARDLIST']),
  },
  created() {
    this.READBOARDLIST('pain103');
  },
};
</script>

<style></style>
