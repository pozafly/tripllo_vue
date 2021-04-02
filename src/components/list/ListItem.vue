<template>
  <div class="list" :data-list-id="list.id" :data-list-pos="list.pos">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        type="text"
        class="form-control input-title"
        ref="inputTitle"
        v-model="inputTitle"
        @keypress.enter="onKeyupEnter"
        @blur="onSubmitTitle"
        maxlength="19"
      />
      <div v-else class="list-header-title" @click.prevent="onClickTitle">
        {{ list.title }} <awesome icon="edit" class="fas fa-edit"></awesome>
      </div>
      <a class="delete-list-btn" href="" @click.prevent="onDeleteList">
        &times;
      </a>
    </div>

    <div class="card-list" :data-list-id="list.id">
      <CardItem v-for="card in list.cards" :key="`${card.id}`" :card="card" />
    </div>

    <div v-if="isAddCard">
      <AddCard
        :listId="list.id"
        @close="isAddCard = false"
        @cardFocus="cardFocus"
      />
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent="isAddCard = true">
        &plus; Add another card
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddCard from '@/components/card/AddCard.vue';
import CardItem from '@/components/card/CardItem.vue';

export default {
  components: {
    AddCard,
    CardItem,
  },
  props: ['list'],
  computed: { ...mapState(['board']) },
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: '',
    };
  },
  created() {
    this.inputTitle = this.list.title;
  },
  methods: {
    ...mapActions(['UPDATE_LIST', 'DELETE_LIST']),
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.value = this.list.title;
        this.$refs.inputTitle.focus();
      });
    },
    onKeyupEnter() {
      event.target.blur();
    },
    onSubmitTitle() {
      this.isEditTitle = false;

      this.inputTitle = this.inputTitle.trim();
      if (!this.inputTitle) return;

      const id = this.list.id;
      const title = this.inputTitle;
      if (title === this.list.title) return;

      this.UPDATE_LIST({ id, title });
    },
    onDeleteList() {
      // if (!window.confirm(`${this.list.title} 리스트를 삭제하시겠습니까?`))
      //   return;
      this.DELETE_LIST({ id: this.list.id });
    },
    cardFocus() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$el.querySelector('.card-list').lastChild.scrollIntoView();
        }, 150);
      });
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
