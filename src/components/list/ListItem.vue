<template>
  <article class="list" :listId="id" :pos="pos">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        ref="inputTitle"
        v-model="inputTitle"
        v-focus
        type="text"
        class="form-control input-title"
        maxlength="19"
        @keypress.enter="onKeyupEnter"
        @blur="onSubmitTitle"
      />
      <h2
        v-else
        class="list-header-title"
        @click.prevent="() => (isEditTitle = true)"
      >
        {{ title }} <awesome icon="edit" class="fas fa-edit"></awesome>
      </h2>
      <a class="delete-list-btn" href="" @click.prevent="onDeleteList">
        &times;
      </a>
    </div>

    <div class="card-list" :listId="id">
      <CardItem v-for="card in cards" :key="`${card.id}`" v-bind="card" />
    </div>

    <div v-if="isAddCard">
      <AddCard
        :list-id="id"
        @close="isAddCard = false"
        @cardFocus="cardFocus"
      />
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent="isAddCard = true">
        &plus; Add another card
      </a>
    </div>
  </article>
</template>

<script>
import AddCard from '@/components/card/AddCard.vue';
import CardItem from '@/components/card/CardItem.vue';
import { updateListAPI, deleteListAPI } from '@/api/list';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    AddCard,
    CardItem,
  },

  props: {
    id: {
      type: Number,
      default: 0,
      required: true,
    },
    pos: {
      type: Number,
      default: 0,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    cards: {
      type: Array,
      default: () => [],
      required: false,
      validator: prop =>
        prop.every(
          e =>
            typeof e === 'string' ||
            typeof e === 'number' ||
            typeof e === 'object',
        ),
    },
  },

  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: '',
    };
  },

  computed: {
    ...mapState(['board']),
  },

  created() {
    this.insertListTitle();
  },

  methods: {
    ...mapActions(['DELETE_LIST', 'READ_BOARD_DETAIL']),

    insertListTitle() {
      this.inputTitle = this.title;
    },

    onKeyupEnter(event) {
      event.target.blur();
    },

    async onSubmitTitle() {
      this.isEditTitle = false;

      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) {
        return;
      }

      const id = this.id;
      const title = this.inputTitle;
      if (title === this.title) {
        return;
      }

      try {
        await updateListAPI(id, { title });
        await this.READ_BOARD_DETAIL(this.board.id);
      } catch (error) {
        console.log(error);
        alert('리스트 제목이 업데이트 되지 않았습니다.');
      }
    },

    async onDeleteList() {
      // if (!window.confirm(`${this.title} 리스트를 삭제하시겠습니까?`))
      //   return;
      try {
        await deleteListAPI(this.id);
        await this.READ_BOARD_DETAIL(this.board.id);
      } catch (error) {
        console.log(error);
        alert('리스트를 삭제하지 못했습니다.');
      }
    },

    cardFocus() {
      setTimeout(() => {
        this.$el.querySelector('.card-list').lastChild.scrollIntoView();
      }, 100);
    },
  },
};
</script>

<style lang="scss">
.list {
  background-color: #ebecf0;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
  pointer-events: visible;
  .list-header {
    flex: 0 0 auto;
    height: 30px;
    padding: 10px 8px 8px;
    position: relative;
    .input-title {
      width: 230px;
    }
    .list-header-title {
      display: inline-block;
      max-width: 220px;
      font-size: 15px;
      font-weight: 700;
      padding: 0 10px 0 8px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        color: #8c8c8c;
        .fa-edit {
          display: inline-block;
        }
      }
      .fa-edit {
        font-size: 10px;
        display: none;
      }
    }
    .delete-list-btn {
      position: absolute;
      right: 10px;
      top: 8px;
      text-decoration: none;
      color: #aaa;
      font-size: 24px;
    }
  }
  .card-list {
    flex: 1 1 auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
      height: 8px;
      background: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #bfc4ce;

      &:hover {
        background-color: #adb5bd;
      }
    }
    &::-webkit-scrollbar-track {
      background: #d9dce2;
    }
  }
  .add-card-btn {
    flex: 0 0 auto;
    display: block;
    padding: 8px 15px;
    color: #8c8c8c;
    text-decoration: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
