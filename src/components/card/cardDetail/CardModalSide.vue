<template>
  <div class="side">
    <a
      class="modal-close-btn"
      href=""
      @click.prevent="$router.push(`/board/${board.id}`)"
    >
      &times;
    </a>
    <div class="side-items">
      <ul>
        <li
          v-for="item in sideItems"
          :key="item"
          :data-name="item"
          class="side-item"
          @click.prevent="onCheckPosition"
        >
          <i :class="modalSideIcon(item)" />
          <span class="side-item-text">{{ item }}</span>
        </li>
      </ul>
      <Labels @close="toggle = ''" v-if="toggle === 'isLabels'" :xy="xy" />
      <Checklist
        @close="toggle = ''"
        v-if="toggle === 'isChecklist'"
        :xy="xy"
      />
      <DueDate @close="toggle = ''" v-if="toggle === 'isDueDate'" :xy="xy" />
      <Attachment
        @close="toggle = ''"
        v-if="toggle === 'isAttachment'"
        :xy="xy"
      />
      <Location @close="toggle = ''" v-if="toggle === 'isLocation'" :xy="xy" />
    </div>
  </div>
</template>

<script>
import Labels from '@/components/card/cardDetail/side/Labels';
import Checklist from '@/components/card/cardDetail/side/Checklist';
import DueDate from '@/components/card/cardDetail/side/DueDate';
import Attachment from '@/components/card/cardDetail/side/Attachment';
import Location from '@/components/card/cardDetail/side/Location';
import { mapActions, mapState } from 'vuex';

export default {
  components: { Labels, Checklist, DueDate, Attachment, Location },
  data() {
    return {
      toggle: '',
      xy: {},
      sideItems: ['Labels', 'Checklist', 'DueDate', 'Attachment', 'Location'],
    };
  },
  computed: {
    ...mapState(['board']),
  },
  methods: {
    onCheckPosition(e) {
      // x, y 좌표값 계산
      const target = e.target.getBoundingClientRect();
      this.xy = {
        x: target.x,
        y: target.y,
      };

      // toggle에 name을 넣어서 보일지 말지 판단함.
      const name = `is${e.target.dataset.name}`;
      this.toggle === name ? (this.toggle = '') : (this.toggle = name);
    },
    modalSideIcon(item) {
      switch (item) {
        case 'Labels':
          return 'modal-side-icon fas fa-tag';
        case 'Checklist':
          return 'modal-side-icon far fa-check-square';
        case 'DueDate':
          return 'modal-side-icon far fa-clock';
        case 'Attachment':
          return 'modal-side-icon fas fa-paperclip';
        case 'Location':
          return 'modal-side-icon fas fa-map-marker-alt';
      }
      return null;
    },
  },
};
</script>

<style scoped lang="scss">
.side {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  .modal-close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 24px;
    color: black;
  }
  .side-items {
    padding-top: 80px;
    .side-item {
      position: relative;
      margin: 12px 8px;
      padding: 8px;
      font-size: 15px;
      background: rgba(9, 30, 66, 0.04);
      border-radius: 3px;
      text-align: left;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-color: rgba(9, 30, 66, 0.1);
      }
      span {
        color: black;
        pointer-events: none;
      }
      .modal-side-icon {
        margin-right: 5px;
        width: 15px;
        pointer-events: none;
      }
      .side-item-text {
        font-size: 14px;
        font-weight: 450;
      }
    }
  }
}
</style>
