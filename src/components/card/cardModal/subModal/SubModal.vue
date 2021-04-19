<template>
  <div class="side">
    <div class="side-items">
      <a class="modal-close-btn" href="" @click.prevent="onCloseModal">
        &times;
      </a>
      <ul>
        <li
          v-for="item in sideItems"
          :key="item"
          class="side-item"
          @click.prevent="onCheckPosition(item)"
        >
          <awesome :icon="modalSideIcon(item)" class="modal-side-icon" />
          <span class="side-item-text">{{ item }}</span>
        </li>
      </ul>
      <SubModalLabels
        v-if="toggle === 'isLabels'"
        class="side-item-label"
        @close="onClose"
      />
      <SubModalChecklist
        v-if="toggle === 'isChecklist'"
        class="side-item-checklist"
        @close="onClose"
      />
      <SubModalDueDate
        v-if="toggle === 'isDueDate'"
        class="side-item-duedate"
        @close="onClose"
      />
      <SubModalAttachment
        v-if="toggle === 'isAttachment'"
        class="side-item-attachment"
        @close="onClose"
      />
      <SubModalLocation
        v-if="toggle === 'isLocation'"
        class="side-item-location"
        @close="onClose"
      />
      <SubModalDeleteCard
        v-if="toggle === 'isDelete'"
        class="side-item-delete"
        @close="onClose"
      />
    </div>
  </div>
</template>

<script>
import SubModalLabels from '@/components/card/cardModal/subModal/SubModalLabels.vue';
import SubModalChecklist from '@/components/card/cardModal/subModal/SubModalChecklist.vue';
import SubModalDueDate from '@/components/card/cardModal/subModal/SubModalDueDate.vue';
import SubModalAttachment from '@/components/card/cardModal/subModal/SubModalAttachment.vue';
import SubModalLocation from '@/components/card/cardModal/subModal/SubModalLocation.vue';
import SubModalDeleteCard from '@/components/card/cardModal/subModal/SubModalDeleteCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    SubModalLabels,
    SubModalChecklist,
    SubModalDueDate,
    SubModalAttachment,
    SubModalLocation,
    SubModalDeleteCard,
  },

  data() {
    return {
      toggle: '',
      sideItems: [
        'Labels',
        'Checklist',
        'DueDate',
        'Attachment',
        'Location',
        'Delete',
      ],
    };
  },

  computed: {
    ...mapState(['board']),
  },

  methods: {
    onCheckPosition(item) {
      // toggle에 name을 넣어서 보일지 말지 판단함.
      const name = `is${item}`;
      this.toggle === name ? (this.toggle = '') : (this.toggle = name);
    },

    modalSideIcon(item) {
      switch (item) {
        case 'Labels':
          return 'tag';
        case 'Checklist':
          return 'check-square';
        case 'DueDate':
          return 'clock';
        case 'Attachment':
          return 'paperclip';
        case 'Location':
          return 'map-marker-alt';
        case 'Delete':
          return 'trash-alt';
      }
      return null;
    },

    onClose() {
      this.toggle = '';
    },

    onCloseModal() {
      this.$router.push(`/board/${this.board.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.side {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  right: 0;
  .side-items {
    position: fixed;
    padding-top: 80px;
    width: 160px;
    .modal-close-btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0px;
      right: 0px;
      font-size: 24px;
      color: black;
      z-index: 999;
      border-radius: 100px;
      width: 40px;
      height: 40px;
      &:hover {
        background: rgba(0, 0, 0, 0.15);
      }
    }
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
        color: #4f5d76;
      }
      .side-item-text {
        font-size: 14px;
        font-weight: 450;
        color: #212732;
      }
    }
  }
  .side-item-label {
    top: 130px;
  }
  .side-item-checklist {
    top: 175px;
  }
  .side-item-duedate {
    top: 220px;
  }
  .side-item-attachment {
    top: 265px;
  }
  .side-item-location {
    top: 310px;
  }
  .side-item-delete {
    top: 355px;
  }
}
</style>
