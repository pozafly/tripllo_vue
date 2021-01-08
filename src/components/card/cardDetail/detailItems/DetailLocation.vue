<template>
  <li class="body-item" v-if="card.location">
    <div>
      <i class="fas fa-map-marker-alt"></i>
      <span class="body-card-text">Loction</span>
      <div class="google-map-static-display" @click="openMap">
        <img :src="imgUrl" class="location-img" />
        <div class="location-wrapper">
          <div class="location-name">{{ location.name }}</div>
          <div class="location-address">{{ location.address }}</div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // map: '',
      imgUrl: '',
      location: {},
    };
  },
  computed: {
    ...mapState(['card']),
  },
  watch: {
    card() {
      this.location = JSON.parse(this.card.location);
      this.setImg();
    },
  },
  mounted() {
    this.location = JSON.parse(this.card.location);
    this.setImg();
    // this.$loadScript(
    //   `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`,
    // ).then(() => {
    //   this.map = new google.maps.Map(
    //     this.$el.querySelector('.google-map-display'),
    //     {
    //       zoom: 14,
    //       center: {
    //         lat: this.location.lat,
    //         lng: this.location.lng,
    //       },
    //     },
    //   );
    // });
  },
  methods: {
    setImg() {
      if (!this.card.location) return;
      const location = this.location;
      // https://developers.google.com/maps/documentation/maps-static/start
      this.imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}
        &zoom=15&size=483x200&markers=color:red|${location.lat},${location.lng}
        &key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&region=kr`;
    },
    openMap() {
      console.log('aaa');
    },
  },
};
</script>

<style scoped lang="scss">
.google-map-static-display {
  display: block;
  position: relative;
  margin-left: 30px;
  top: 13px;
  width: 92%;
  height: auto;
  border-radius: 3px;
  background: rgba(9, 30, 66, 0.04);
  &:hover {
    background: rgba(9, 30, 66, 0.1);
  }
  .location-img {
    width: 100%;
  }
  .location-wrapper {
    width: 93.2%;
    padding: 0 16px 10px;
    .location-name {
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      margin-bottom: 0;
      margin-left: -8px;
      min-height: 20px;
      padding: 4px 8px;
    }
    .location-address {
      color: #5e6c84;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
    }
  }
}
</style>
