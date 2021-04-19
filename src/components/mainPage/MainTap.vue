<template>
  <ul class="side-wrap">
    <li
      :class="[{ active: mainTapId === 0 }, 'side-item']"
      @click="changeMainTap(0)"
    >
      <div class="item-wrap">
        <awesome icon="user" class="icon" />
        <span class="move-text">Personal</span>
      </div>
    </li>
    <li
      :class="[{ active: mainTapId === 1 }, 'side-item']"
      @click="changeMainTap(1)"
    >
      <div class="item-wrap">
        <awesome icon="user-friends" class="icon" />
        <span class="move-text">Invited</span>
      </div>
    </li>
    <li
      :class="[{ active: mainTapId === 2 }, 'side-item']"
      @click="changeMainTap(2)"
    >
      <div class="item-wrap">
        <awesome icon="globe-americas" class="icon" />
        <span class="move-text">Public</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { saveSessionStorage, getSessionStorage } from '@/utils/webStorage';

export default {
  data() {
    return {
      mainTapId: getSessionStorage('mainTapId'),
    };
  },

  methods: {
    changeMainTap(value) {
      this.mainTapId = value;
      this.$emit('changeTap', value);
      saveSessionStorage('mainTapId', value);
    },
  },
};
</script>

<style scpoed lang="scss">
.side-wrap {
  height: 100px;
  width: 200px;
  top: 100px;
  position: sticky;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .side-item {
    position: relative;
    height: 50px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: #666;
    }
  }
  .item-wrap {
    .icon {
      color: #444e61;
      width: 12px;
      height: 12px;
    }
    .move-text {
      color: #212732;
      margin-left: 8px;
    }
  }
}
</style>
