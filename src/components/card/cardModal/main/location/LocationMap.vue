<template>
  <LocationMapBase>
    <div slot="header">
      <div class="map-header">
        <div class="loaction-map-cancel" @click="$emit('close')">&times;</div>
      </div>
    </div>
    <div slot="body" class="google-map-wrap">
      <input
        ref="searchMap"
        type="text"
        class="form-control map-inside-input"
        placeholder="카드 location 변경"
      />
      <LocationToCard v-if="isCardAbout" :card-info="cardInfo" />
      <div class="google-map-display"></div>
    </div>
  </LocationMapBase>
</template>

<script>
import LocationMapBase from '@/components/card/cardModal/main/location/LocationMapBase.vue';
import LocationToCard from '@/components/card/cardModal/main/location/LocationToCard.vue';
import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    LocationMapBase,
    LocationToCard,
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

  computed: {
    ...mapState(['card', 'board']),
  },

  watch: {
    async card() {
      // 카드가 리랜더링 되면, 카드의 location 문자열을 가지고 와서 파싱함.
      this.location = await JSON.parse(this.card.location);
      await this.makeLocationArray();
      await this.mapDraw();
    },
  },

  mounted() {
    // 구글 API를 사용하기 위한 loader
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

  methods: {
    ...mapActions(['UPDATE_CARD']),
    mapDraw() {
      this.map = new google.maps.Map(
        this.$el.querySelector('.google-map-display'),
        {
          zoom: 16, // 맵 랜더링 시, 줌을 얼마만큼 땡겨놀 것인가?
          center: { lat: this.location.lat, lng: this.location.lng }, // 위치 지정해줌
          fullscreenControl: false, // 전체 화면 모드 사용하지 않음.
          mapTypeControl: false, //옵션으로 구글 맵에 붙어있는 컨트롤 컴포넌트들 사용하지 않음.
        },
      );
      // 이벤트를 지정할 수 있다. 드래그, 줌, 클릭. 3개의 이벤트를 들고와서 등록해준다.
      const event = ['drag', 'zoom_changed', 'click'];
      event.forEach(el => {
        this.map.addListener(el, () => {
          this.isCardAbout = false;
        });
      });

      this.makeMarkers();
    },

    // 마커는 지도를 클릭했을 때, 표시하는 마커를 말함.
    makeMarkers() {
      // 이렇게 location 지정해주면 됨.
      const markers = this.locationArray.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          animation: google.maps.Animation.DROP, // 밑으로 떨어지는 애니메이션을 지정
          title: location.cardInfo,
        });
      });
      // 마커 클릭 이벤트 등록
      markers.forEach(marker => {
        marker.addListener('click', e => {
          let cardInfo = JSON.parse(marker.getTitle());

          // 마커를 클릭했을 때, document 상 위치를 반환해서 화면에 표시해주기 위함.
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

    // 구글 API의 지도 찾기
    searchControl() {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.searchMap,
        // 타입은, 주소와 기관 2개 형태 모두 조회 가능.
        { types: ['geocode', 'establishment'] },
      );
      // 장소가 변화하면,
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        const geometry = {
          lat: place.geometry.location.lat(), // 위도
          lng: place.geometry.location.lng(), // 경도
          address: place.formatted_address, // 주소
          name: place.name, // 장소의 이름
        };
        // 객체를 문자열로 저장 name
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
