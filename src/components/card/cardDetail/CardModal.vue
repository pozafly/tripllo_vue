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
        <li class="body-item">
          <awesome icon="layer-group" class="fas fa-layer-group"></awesome>
          <span class="body-card-text">Description</span>
          <textarea
            class="form-control card-desc textarea"
            ref="inputDesc"
            v-model="description"
            v-if="isEditDesc"
            :readonly="!isEditDesc"
            spellcheck="false"
            @blur="onSubmitDesc"
          />
          <textarea
            v-else
            class="form-control card-desc"
            @click="onEditDesc"
            :value="card.description"
            spellcheck="false"
            placeholder="Add a more detailed description..."
          >
          </textarea>
          <template v-if="isEditDesc">
            <button class="card-desc-btn" @click="onSubmitDesc">Save</button>
            <a href="" class="desc-cancel" @click.prevent="isEditDesc = false">
              &times;
            </a>
          </template>
        </li>
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
import DetailComment from './detailItems/detailComment/DetailComment';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    CardModalBase,
    CardModalSide,
    DetailLabels,
    DetailChecklist,
    DetailDueDate,
    DetailLocation,
    DetailComment,
  },
  data() {
    return {
      isEditTitle: false,
      isEditDesc: false,
      description: '',
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
    ]),
    ...mapMutations(['deleteComment']),
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
    onEditDesc() {
      this.isEditDesc = true;
      this.description = this.card.description;
      this.$nextTick(() => this.$refs.inputDesc.focus());
    },
    // relatedTarget: 이벤트 발생 타겟을 의미함.
    onSubmitDesc({ relatedTarget }) {
      this.isEditDesc = false;

      // body를 눌렀을 때, 이벤트 타겟이 null로 나오므로 그냥 통과(저장된단 말임.)
      if (relatedTarget) {
        if (relatedTarget.className === 'desc-cancel') return; // x버튼을 눌렀을 때는 return
      }
      if (this.description === this.card.description) return;
      this.UPDATE_CARD({ id: this.card.id, description: this.description });
    },
    onKeyupEnter() {
      event.target.blur();
    },
  },
  async created() {
    await this.READ_CARD({ id: this.$route.params.cardId });
    await this.READ_CHECKLIST({ id: this.card.id });
    await this.READ_COMMENT(this.card.id).catch(({ response }) => {
      if (response.data.status === 'NOT_FOUND') this.deleteComment();
    });
  },
};
</script>

<style lang="scss">
.modal-card-header-title {
  padding-right: 30px;
  min-height: 30px;
  a {
    color: black;
    font-size: 20px;
    margin-left: 15px;
    .fa-edit {
      display: none;
      font-size: 10px;
    }
    &:hover {
      color: rgba(0, 0, 0, 0.3);
      .fa-edit {
        display: inline-block;
      }
    }
  }
  .card-title-input {
    position: absolute;
    margin: 0 0 0 15px;
    padding: 3px 6px;
    width: 90%;
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
    font-size: 20px;
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
      .card-desc {
        display: block;
        margin: 13px 0 7px 35px;
        width: 92%;
        overflow-wrap: break-word;
        resize: none;
        border: none;
        font-family: Arial;
        font-size: 14px;
        background: none;
        cursor: pointer;
        height: 5rem;
        background: rgba(9, 30, 66, 0.04);
        &:hover {
          background: rgba(9, 30, 66, 0.1);
        }
        &.textarea {
          height: 7rem;
          background: #fff;
        }
      }
      .card-desc-btn {
        display: inline;
        margin: 0 0 40px 27px;
        width: 55px;
        height: 33px;
        position: relative;
        left: 8px;
        &:hover {
          filter: brightness(90%);
        }
      }
      .desc-cancel {
        margin-left: 20px;
        font-size: 20px;
        color: black;
        &:hover {
          font-weight: 700;
        }
      }
    }
  }
}
.side-slot {
  height: 100%;
}
</style>
