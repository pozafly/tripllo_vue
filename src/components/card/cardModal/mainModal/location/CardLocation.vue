<template>
  <li v-if="card.location" class="body-item">
    <div>
      <awesome icon="map-marker-alt" class="fas fa-map-marker-alt"></awesome>
      <span class="body-card-text">Loction</span>
      <div class="google-map-static-display" @click="openMap">
        <div class="location-wrapper">
          <img :src="imgUrl" class="location-img" alt="google location" />
          <div class="location-detail">
            <div class="location-name">{{ location.name }}</div>
            <div class="location-address">{{ location.address }}</div>
          </div>
          <div class="location-icon">
            <div class="location-control" @click="gotoGoogle">
              ↗
            </div>
            <div class="location-control" @click="isDelete = true">
              ···
            </div>
          </div>
        </div>
      </div>
      <div v-if="isDelete" class="location-delete">
        <MiniModal @close="isDelete = false">
          <div slot="header" class="header-text">Delete Location</div>
          <div slot="content">
            <button
              class="location-delete-btn"
              type="button"
              @click="deleteLocation"
            >
              Delete this Location?
            </button>
          </div>
        </MiniModal>
      </div>
    </div>
    <CardLocationMap v-if="isLocationMap" @close="isLocationMap = false" />
  </li>
</template>

<script>
import CardLocationMap from '@/components/card/cardModal/mainModal/location/CardLocationMap';
import { updateCardAPI } from '@/api/card';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    CardLocationMap,
  },

  data() {
    return {
      isDelete: false,
      isLocationMap: false,
      imgUrl: '',
      location: {},
    };
  },

  computed: {
    ...mapState(['card', 'board']),
  },

  watch: {
    card() {
      if (!this.card.location) {
        return;
      }
      this.location = JSON.parse(this.card.location);
      this.setImg();
    },
  },

  mounted() {
    this.setImg();
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL', 'READ_CARD']),

    setImg() {
      if (!this.card.location) {
        return;
      }
      this.location = JSON.parse(this.card.location);

      const location = this.location;
      // https://developers.google.com/maps/documentation/maps-static/start
      this.imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}
        &zoom=15&size=560x190&markers=color:red|${location.lat},${location.lng}
        &key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&region=kr`;
    },

    openMap(e) {
      if (e.target.className === 'location-control') {
        return;
      }
      this.isLocationMap = true;
    },

    gotoGoogle() {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.location.lat}%2C${this.location.lng}`;
      window.open(url, '_blank');
    },

    async deleteLocation() {
      this.isDelete = false;

      try {
        await updateCardAPI(this.card.id, { location: '' });
        await this.READ_BOARD_DETAIL(this.board.id);
        await this.READ_CARD(this.card.id);
      } catch (error) {
        console.log(error);
        alert('카드 정보를 수정하지 못했습니다.');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.google-map-static-display {
  position: relative;
  margin-left: 30px;
  top: 13px;
  width: 560px;
  height: auto;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(9, 30, 66, 0.04);
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  .location-wrapper {
    width: 560px;
    padding: 0 0px 10px;
    .location-detail {
      margin-left: 16px;
      width: 73%;
      font-size: 14px;
      line-height: 20px;
      .location-name {
        font-weight: 700;
        margin-bottom: 0;
        margin-left: -8px;
        min-height: 20px;
        padding: 4px 8px;
      }
      .location-address {
        color: #5e6c84;
        font-weight: 400;
      }
    }
    .location-icon {
      align-items: center;
      display: flex;
      position: absolute;
      font-size: 15px;
      right: 20px;
      top: 210px;
      z-index: 40;
      cursor: pointer;
      .location-control {
        margin-left: 12px;
        padding: 4px;
        width: 17px;
        text-align: center;
        border-radius: 4px;
        &:hover {
          background: #d1d5dd;
        }
      }
    }
  }
}
.location-delete {
  position: relative;
  display: inline;
  top: 0px;
  left: 400px;
  width: 310px;
  height: 98px;
  overflow-x: hidden;
  z-index: 9999;
  .location-delete-btn {
    width: 100%;
    height: 37px;
    background: #cf513d;
    &:hover {
      background: #eb5a46;
    }
  }
}
</style>
