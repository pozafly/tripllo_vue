<template>
  <li class="body-item" v-if="card.location">
    <div>
      <i class="fas fa-map-marker-alt"></i>
      <span class="body-card-text">Loction</span>
      <div class="google-map-static-display" @click="openMap">
        <div class="location-wrapper">
          <img :src="imgUrl" class="location-img" />
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
            <div class="location-delete" v-if="isDelete">
              <SideBase @close="isDelete = false">
                <div slot="header" class="header-text">Delete Location</div>
                <div slot="content">
                  <button class="location-delete-btn" @click="deleteLocation">
                    Delete this Location?
                  </button>
                </div>
              </SideBase>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LocationMap v-if="isLocationMap" @close="isLocationMap = false" />
  </li>
</template>

<script>
import SideBase from '@/components/card/cardDetail/side/SideBase';
import LocationMap from './LocationMap';
import { mapActions, mapState } from 'vuex';

export default {
  components: { SideBase, LocationMap },
  data() {
    return {
      isDelete: false,
      isLocationMap: false,
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
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    setImg() {
      if (!this.card.location) return;
      const location = this.location;
      // https://developers.google.com/maps/documentation/maps-static/start
      this.imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}
        &zoom=15&size=560x190&markers=color:red|${location.lat},${location.lng}
        &key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}&region=kr`;
    },
    openMap(e) {
      if (e.target.className === 'location-control') return;
      this.isLocationMap = true;
    },
    gotoGoogle() {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.location.lat}%2C${this.location.lng}`;
      window.open(url, '_blank');
    },
    deleteLocation() {
      this.isDelete = false;
      this.UPDATE_CARD({ id: this.card.id, location: '' });
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
      .location-delete {
        position: absolute;
        top: 40px;
        left: -100px;
        overflow-x: visible;
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
    }
  }
}
</style>
