<template>
  <span @click="moveToUserPage">
    <span v-if="createdBy" class="profile-wrap">
      <span
        v-if="createdByPicture"
        href=""
        class="owner-picture img"
        :style="{ backgroundImage: `url(${createdByPicture})` }"
      ></span>
      <awesome v-else icon="user" class="invited-picture fas fa-user"></awesome>
      <span class="user-id">@{{ createdBy }}</span>
    </span>
    <span v-else class="profile-wrap">
      <span
        v-if="picture"
        href=""
        class="invited-picture img"
        :style="{ backgroundImage: `url(${picture})` }"
      ></span>
      <awesome v-else icon="user" class="invited-picture fas fa-user"></awesome>
      <span class="user-id">@{{ id }}</span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      require: false,
      default: null,
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
    picture: {
      type: String,
      require: false,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
    createdBy: {
      type: String,
      require: false,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
    createdByPicture: {
      type: String,
      require: false,
      default: '',
      validator(value) {
        return typeof value === 'string';
      },
    },
  },

  methods: {
    moveToUserPage(event) {
      if (event.target.className === 'owner-picture img') {
        this.$router.push(`/user/${this.createdBy}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.profile-wrap {
  position: relative;
  .owner-picture {
    padding: 5px 14px;
    background-color: rgba(255, 255, 255, 0.5);
    color: white;
    transition: all 0.3s;
    &.fa-user {
      position: relative;
      top: 7px;
      padding: 7px 8px;
      border-radius: 50%;
    }
    &.img {
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .invited-picture {
    padding: 5px 14px;
    background-color: rgba(255, 255, 255, 0.5);
    color: white;
    transition: all 0.3s;
    &.fa-user {
      position: relative;
      top: 7px;
      padding: 7px 8px;
      border-radius: 50%;
    }
    &.img {
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  &:hover {
    .user-id {
      display: inline;
    }
  }
  .user-id {
    position: absolute;
    top: -38px;
    left: -30px;
    z-index: 10;
    color: black;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.5);
    font-size: 13.5px;
    display: none;
  }
}
</style>
