<template>
  <MiniModal @close="$emit('close')">
    <div slot="header" class="header-text">Location</div>
    <div slot="content">
      <input
        ref="searchMap"
        v-focus
        type="text"
        class="form-control"
        placeholder="Search Google Maps"
      />
    </div>
  </MiniModal>
</template>

<script>
import { updateCardAPI } from '@/api/card';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      autocomplete: '',
    };
  },

  computed: {
    ...mapState(['card', 'board']),
  },

  mounted() {
    this.mapLoadScript();
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL', 'READ_CARD']),

    mapLoadScript() {
      // loadScript는 컴포넌트 단위로 외부 script 태그를 삽입해줌.
      this.$loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&libraries=places`,
      )
        .then(() => {
          this.autocomplete = new google.maps.places.Autocomplete(
            this.$refs.searchMap,
            {
              // geocode: 단순 주소    ||    establishment : 지역정보 서비스(업체)
              types: ['geocode', 'establishment'],
            },
          );
          this.autocomplete.addListener('place_changed', this.fillInAddress);
        })
        .catch(error => {
          console.log(error);
          alert('구글맵 서버와의 연동에 실패했습니다.');
        });
    },

    async fillInAddress() {
      const place = this.autocomplete.getPlace();
      const geometry = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
        name: place.name,
      };
      // 객체를 문자열로 저장name
      const location = JSON.stringify(geometry);

      try {
        await updateCardAPI(this.card.id, { location });
        await this.READ_BOARD_DETAIL(this.board.id);
        await this.READ_CARD(this.card.id);
      } catch (error) {
        console.log(error);
        alert('지도 정보를 가져오지 못했습니다.');
      }

      this.$emit('close');
    },
  },
};
</script>

<style></style>
