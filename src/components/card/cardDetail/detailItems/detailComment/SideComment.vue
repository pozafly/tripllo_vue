<template>
  <div class="comment-wrap">
    <textarea
      class="form-control comment-input textarea"
      ref="input"
      v-model="commentText"
      spellcheck="false"
      v-if="isEditComment"
      @blur="onSubmitComment"
      @keypress.enter="onKeyupEnter"
    />
    <span class="comment-comment" v-else>{{ item.comment }}</span>
    <div class="comment-side" v-if="editPossible && !isEditComment">
      <span class="comment-side-item" @click="onEditComment">Edit</span>
      <span class="comment-side-item" @click="isDelete = true">
        Delete
      </span>
    </div>
    <div class="comment-delete" v-if="isDelete">
      <SideBase @close="isDelete = false">
        <div slot="header" class="header-text">Delete Comment</div>
        <div slot="content">
          <button class="comment-delete-btn" @click="deleteComment(item)">
            Delete this Comment?
          </button>
        </div>
      </SideBase>
    </div>
  </div>
</template>

<script>
import SideBase from '@/components/card/cardDetail/side/SideBase';
import { mapActions, mapState } from 'vuex';

export default {
  components: { SideBase },
  props: ['item'],
  data() {
    return {
      isDelete: false,
      commentText: '',
      isEditComment: false,
    };
  },
  computed: {
    ...mapState(['user', 'card']),
    editPossible() {
      return this.user.id === this.item.createdBy;
    },
  },
  methods: {
    ...mapActions(['UPDATE_COMMENT', 'DELETE_COMMENT']),
    deleteComment(item) {
      this.DELETE_COMMENT(item.id);
    },
    onKeyupEnter() {
      event.target.blur();
    },
    onSubmitComment() {
      this.isEditComment = false;

      if (this.commentText === '') return;
      if (this.commentText === this.item.comment) return;

      const id = this.item.id;
      const userId = this.user.id;
      const comment = this.commentText;

      this.UPDATE_COMMENT({ id, userId, comment });
    },
    onEditComment() {
      this.isEditComment = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
        this.commentText = this.item.comment;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.comment-wrap {
  display: inline;
  .comment-comment {
    font-size: 14px;
    position: relative;
    display: inline-block;
    padding: 5px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px -1px rgba(9, 30, 66, 0.25),
      0 0 0 1px rgba(9, 30, 66, 0.08);
    box-sizing: border-box;
    margin: 4px 2px 12px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .comment-input {
    margin: 4px 2px 12px 0;
    display: block;
    width: 100%;
    overflow-wrap: break-word;
    resize: none;
    height: 32px;
    border: none;
    font-family: Arial;
    font-size: 14px;
    cursor: pointer;
    background: #fff;
    overflow: hidden;
    overflow-wrap: break-word;
    outline: none;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
    }
    &.textarea {
      height: 32px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
      outline: none;
    }
  }
  .comment-side {
    display: inline;
    .comment-side-item {
      position: relative;
      top: -16px;
      left: 3px;
      margin-left: 5px;
      font-size: 12px;
      cursor: pointer;
      text-decoration: underline;
      padding: 4px;
      border-radius: 8px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .comment-delete {
    position: relative;
    display: inline;
    top: -15px;
    left: -45px;
    width: 310px;
    height: 98px;
    overflow-x: hidden;
    z-index: 9999;
    .comment-delete-btn {
      width: 100%;
      height: 37px;
      background: #cf513d;
      &:hover {
        background: #eb5a46;
      }
    }
  }
}
</style>
