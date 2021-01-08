<template>
  <!-- <li class="body-item" v-if="card.location"> -->
  <li class="body-item">
    <div>
      <i class="fas fa-map-marker-alt"></i>
      <span class="body-card-text">Loction</span>
      <div class="google-map-display"></div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['card']),
  },
};
</script>

<style></style>
