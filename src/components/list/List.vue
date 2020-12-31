<template>
  <div class="list" :data-list-id="list.id">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        type="text"
        class="form-control input-title"
        ref="inputTitle"
        v-model="inputTitle"
        @keypress.enter="onKeyupEnter"
        @blur="onSubmitTitle"
      />
      <div v-else class="list-header-title" @click.prevent="onClickTitle">
        {{ list.title }} <i class="fas fa-edit"></i>
      </div>
      <a class="delete-list-btn" href="" @click.prevent="onDeleteList">
        &times;
      </a>
    </div>

    <div class="card-list" :data-list-id="list.id">
      <CardItem v-for="card in list.cards" :key="`${card.id}`" :card="card" />
    </div>

    <div v-if="isAddCard">
      <AddCard :listId="list.id" @close="isAddCard = false" />
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent="isAddCard = true">
        &plus; Add another card
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddCard from '@/components/card/AddCard';
import CardItem from '@/components/card/CardItem';

export default {
  components: {
    AddCard,
    CardItem,
  },
  props: ['list'],
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
  },
};
</script>

<style lang="scss">
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
  .list-header {
    flex: 0 0 auto;
    height: 30px;
    padding: 10px 8px 8px;
    position: relative;
    .input-title {
      width: 90%;
    }
    .list-header-title {
      font-size: 15px;
      font-weight: 700;
      padding-left: 8px;
      line-height: 30px;
      cursor: pointer;
      .fa-edit {
        display: none;
      }
      &:hover {
        .fa-edit {
          display: inline-block;
          font-size: 10px;
        }
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
    overflow-x: hidden;
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
