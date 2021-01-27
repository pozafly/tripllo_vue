<template>
  <span>
    <span v-if="board" class="profile-wrap">
      <span
        href=""
        class="invited-picture img"
        v-if="
          board.createdByPicture !== null && board.createdByPicture !== 'null'
        "
        :style="{ backgroundImage: `url(${board.createdByPicture})` }"
      ></span>
      <awesome icon="user" class="invited-picture fas fa-user" v-else></awesome>
      <span class="user-id">@{{ board.createdBy }}</span>
    </span>
    <span v-else class="profile-wrap">
      <span
        href=""
        class="invited-picture img"
        v-if="item.picture !== null && item.picture !== 'null'"
        :style="{ backgroundImage: `url(${item.picture})` }"
      ></span>
      <awesome icon="user" class="invited-picture fas fa-user" v-else></awesome>
      <span class="user-id">@{{ item.id }}</span>
    </span>
  </span>
</template>

<script>
export default {
  props: ['item', 'board'],
};
</script>

<style scoped lang="scss">
.profile-wrap {
  position: relative;
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
