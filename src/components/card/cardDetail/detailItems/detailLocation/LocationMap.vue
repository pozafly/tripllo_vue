<template>
  <LocationMapBase>
    <div slot="header">
      <div class="map-header">
        <div class="loaction-map-cancel" @click="$emit('close')">&times;</div>
      </div>
    </div>
    <div slot="body" class="google-map-wrap">
      <input
        type="text"
        class="form-control map-inside-input"
        placeholder="카드 location 변경"
        ref="searchMap"
      />
      <CardAboutLocation v-if="isCardAbout" :cardInfo="cardInfo" />
      <div class="google-map-display"></div>
    </div>
  </LocationMapBase>
</template>

<script>
import LocationMapBase from './LocationMapBase';
import CardAboutLocation from './CardAboutLocation';
import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    LocationMapBase,
    CardAboutLocation,
  },
  data() {
    return {
      map: '',
      location: {},
      autocomplete: '',
      locationArray: [],
      isCardAbout: false,
      cardInfo: {},
    };
  },
  watch: {
    async card() {
      this.location = await JSON.parse(this.card.location);
      await this.makeLocationArray();
      await this.mapDraw();
    },
  },
  computed: {
    ...mapState(['card', 'board']),
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    mapDraw() {
      this.map = new google.maps.Map(
        this.$el.querySelector('.google-map-display'),
        {
          zoom: 16,
          center: { lat: this.location.lat, lng: this.location.lng },
          fullscreenControl: false,
          mapTypeControl: false,
        },
      );
      const event = ['drag', 'zoom_changed', 'click'];
      event.forEach(el => {
        this.map.addListener(el, () => {
          this.isCardAbout = false;
        });
      });

      this.makeMarkers();
    },
    makeMarkers() {
      const markers = this.locationArray.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          animation: google.maps.Animation.DROP,
          title: location.cardInfo,
        });
      });
      // 마커 클릭 이벤트 등록
      markers.forEach(marker => {
        marker.addListener('click', e => {
          let cardInfo = JSON.parse(marker.getTitle());
          cardInfo.x = e.domEvent.clientX;
          cardInfo.y = e.domEvent.clientY;
          this.cardInfo = cardInfo;
          this.isCardAbout = true;
        });
      });

      // 클러스터 등록
      const markerClusterer = new MarkerClusterer(this.map, markers, {
        imagePath:
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      });
    },
    searchControl() {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.searchMap,
        { types: ['geocode', 'establishment'] },
      );
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        const geometry = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address,
          name: place.name,
        };
        // 객체를 문자열로 저장name
        const location = JSON.stringify(geometry);
        this.UPDATE_CARD({ id: this.card.id, location });
        this.$refs.searchMap.value = '';
      });
    },
    makeLocationArray() {
      this.locationArray = [];
      // 이 보드에 해당하는 모든 카드의 location을 배열화. 마커 클러스터를 만들기 위함.
      this.board.lists.map(list => {
        list.cards.map(card => {
          if (card.location) {
            let pushItem = JSON.parse(card.location);
            const cardInfo = { title: card.title, cardId: this.card.id };
            pushItem.cardInfo = JSON.stringify(cardInfo);
            this.locationArray.push(pushItem);
          }
        });
      });
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => {
      this.mapDraw();
      this.searchControl();
    });
  },
  async created() {
    this.location = await JSON.parse(this.card.location);
    this.makeLocationArray();
  },
};
</script>

<style scoped lang="scss">
.map-header {
  margin: 8px;
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 10;
  font-size: 26px;
  font-weight: 300;
  .loaction-map-cancel {
    cursor: pointer;
    &:hover {
      font-weight: 500;
    }
  }
}
.google-map-wrap {
  height: 100%;
  .map-inside-input {
    position: absolute;
    display: inline;
    top: 15px;
    left: 23px;
    z-index: 10;
    width: 300px;
    background: white;
    border: 2px solid blue;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .google-map-display {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
