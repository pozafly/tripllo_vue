<template>
  <CardModalBase>
    <div slot="header">
      <div class="modal-card-header-title">
        <awesome
          :icon="['far', 'clipboard']"
          class="far fa-clipboard"
        ></awesome>
        <input
          class="form-control card-title-input"
          type="text"
          ref="inputTitle"
          v-if="isEditTitle"
          :value="card.title"
          @blur="onSubmitTitle"
          @keypress.enter="onKeyupEnter"
        />
        <a v-else href="" @click.prevent="onEditTitle">
          {{ card.title }} <awesome icon="edit" class="fas fa-edit"></awesome>
        </a>
        <span class="card-list-title">in list {{ listTitle }}</span>
      </div>
    </div>
    <div slot="body" class="modal-card-body">
      <ul class="body-items">
        <DetailLabels />
        <DetailDueDate />
        <DetailDescription :card="card" />
        <DetailAttachment />
        <DetailChecklist v-if="checklists" />
        <DetailLocation />
        <DetailComment />
      </ul>
    </div>
    <div slot="footer"></div>
    <div slot="side" class="side-slot">
      <CardModalSide />
    </div>
  </CardModalBase>
</template>

<script>
import CardModalBase from '@/components/card/cardDetail/CardModalBase';
import CardModalSide from '@/components/card/cardDetail/side/CardModalSide';
import DetailLabels from './detailItems/DetailLabels';
import DetailChecklist from './detailItems/detailChecklists/DetailChecklist';
import DetailDueDate from './detailItems/DetailDueDate';
import DetailLocation from './detailItems/detailLocation/DetailLocation';
import DetailDescription from './detailItems/DetailDescription';
import DetailComment from './detailItems/detailComment/DetailComment';
import DetailAttachment from './detailItems/detailAttachment/DetailAttachment';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    CardModalBase,
    CardModalSide,
    DetailLabels,
    DetailChecklist,
    DetailDueDate,
    DetailDescription,
    DetailLocation,
    DetailComment,
    DetailAttachment,
  },
  data() {
    return {
      isEditTitle: false,
      listTitle: '',
    };
  },
  computed: {
    ...mapState(['board', 'card', 'checklists']),
  },
  watch: {
    // UPDATE_CARD 후 card가 들어오면 실행되도록.
    card() {
      const { title } = this.board.lists.filter(l => {
        return l.id == this.card.listId;
      })[0];
      this.listTitle = title;
    },
  },
  methods: {
    ...mapActions([
      'READ_CARD',
      'UPDATE_CARD',
      'READ_CHECKLIST',
      'READ_COMMENT',
      'READ_FILE',
    ]),
    ...mapMutations(['deleteComment', 'deleteFile']),
    onEditTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => this.$refs.inputTitle.focus());
    },
    onSubmitTitle() {
      this.isEditTitle = false;

      const inputTitle = this.$refs.inputTitle.value || '';
      if (inputTitle === this.card.title) return;
      this.UPDATE_CARD({ id: this.card.id, title: inputTitle });
    },
    onKeyupEnter(event) {
      event.target.blur();
    },
  },
  async created() {
    await this.READ_CARD({ id: this.$route.params.cardId });
    await this.READ_CHECKLIST({ id: this.card.id });
    await this.READ_COMMENT(this.card.id);
    await this.READ_FILE(this.card.id);
  },
};
</script>

<style lang="scss">
.modal-card-header-title {
  padding-right: 30px;
  min-height: 30px;
  a {
    color: #212732;
    font-size: 20px;
    margin-left: 15px;
    .fa-edit {
      display: none;
      font-size: 10px;
      color: #4f5d76;
    }
    &:hover {
      color: rgba(0, 0, 0, 0.3);
      .fa-edit {
        display: inline-block;
        color: #4f5d76;
      }
    }
  }
  .card-title-input {
    position: absolute;
    margin: 0 0 0 15px;
    padding: 3px 6px;
    width: 80%;
    display: inline;
    overflow: hidden;
    overflow-wrap: break-word;
    height: 28px;
    font-size: 17px;
  }
  .card-list-title {
    position: absolute;
    padding: 7px 0 40px 39px;
    display: block;
    font-size: 13px;
    font-weight: 400;
  }
  .fa-clipboard {
    padding: 1px;
    margin-top: 5px;
    font-size: 20px;
    color: #4f5d76;
  }
}

.modal-card-body {
  margin-bottom: 10px;
  .body-items {
    .body-item {
      padding-top: 40px;
      .fas,
      .fa {
        font-size: 16px;
        color: #4f5d76;
      }
      .body-card-text {
        display: inline;
        margin-left: 14px;
        padding: 3px 6px;
        width: 90%;
        overflow: hidden;
        overflow-wrap: break-word;
        height: 28px;
        font-size: 18px;
      }
    }
  }
}
.side-slot {
  height: 100%;
}
</style>
