<template>
  <SideBase @close="$emit('close')">
    <div slot="header" class="header-text">Add Location</div>
    <div slot="content">
      <input
        type="text"
        class="form-control"
        placeholder="Search Google Maps"
        ref="searchMap"
      />
    </div>
  </SideBase>
</template>

<script>
import LoadScript from 'vue-plugin-load-script';
import { mapActions, mapState } from 'vuex';
import SideBase from './SideBase';

export default {
  components: {
    SideBase,
  },
  data() {
    return {
      autocomplete: '',
    };
  },
  computed: {
    ...mapState(['card']),
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.searchMap.focus();
    });
    this.$loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&libraries=places`,
    ).then(() => {
      console.log('google map init');
      // let map = new google.maps.Map(
      //   this.$el.querySelector('google-map-display'),
      //   {
      //     zoom: 12.5,
      //     center: {
      //       lat: -34.397,
      //       lng: -150.644,
      //     },
      //   },
      // );

      // this.geocoder = new google.maps.Geocoder();
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.searchMap,
        {
          // geocode: 단순 주소    ||    establishment : 지역정보 서비스(업체)
          types: ['geocode', 'establishment'],
        },
      );
      this.autocomplete.addListener('place_changed', this.fillInAddress);
    });
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    fillInAddress() {
      const place = this.autocomplete.getPlace();
      const geometry = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const location = JSON.stringify(geometry);
      this.UPDATE_CARD({ id: this.card.id, location });
      this.$emit('close');
    },
  },
};
</script>

<style></style>
