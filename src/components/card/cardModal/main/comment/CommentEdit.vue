<template>
  <div class="comment-wrap">
    <textarea
      v-if="isEditComment"
      ref="input"
      v-model="commentText"
      class="form-control comment-input textarea"
      spellcheck="false"
      @blur="onSubmitComment"
      @keypress.enter="onKeyupEnter"
    />
    <span v-else class="comment-comment">{{ item.comment }}</span>
    <div v-if="!isEditComment" class="comment-side">
      <span v-if="user.id === item.createdBy && item.deleteYn === 'N'">
        <span class="comment-side-item" @click="onEditComment">Edit</span>
        <span class="comment-side-item" @click="isDelete = true">Delete</span>
      </span>

      <!-- 대댓글(답글)은 삭제된 메세지에는 달수 없고, 대댓글 자체에도 달 수 없다. 일반 댓글에만 달 수 있음. -->
      <template v-if="item.deleteYn === 'N' && item.dept === 0">
        <textarea
          v-if="isEditNestedComment"
          ref="nestedComment"
          v-model="nestedComment"
          class="form-control comment-input textarea nested"
          spellcheck="false"
          placeholder="Write a comment..."
          @blur="onSubmitNestedComment"
          @keypress.enter="onKeyupEnter"
        />
        <span
          v-if="!isEditNestedComment"
          class="comment-side-item nested"
          @click="onEditNestedComment"
        >
          답글 달기
        </span>
      </template>
    </div>
    <div v-if="isDelete" class="comment-delete">
      <MiniModal @close="isDelete = false">
        <div slot="header" class="header-text">Delete Comment</div>
        <div slot="content">
          <button
            class="comment-delete-btn"
            type="button"
            @click="deleteComment(item)"
          >
            Delete this Comment?
          </button>
        </div>
      </MiniModal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      isDelete: false,
      commentText: '',
      nestedComment: '',
      isEditComment: false,
      isEditNestedComment: false,
    };
  },

  computed: {
    ...mapState(['user', 'card']),
  },

  methods: {
    ...mapActions(['UPDATE_COMMENT', 'DELETE_COMMENT', 'CREATE_COMMENT']),
    deleteComment(item) {
      this.isDelete = false;
      this.DELETE_COMMENT(item.id);
    },
    onKeyupEnter() {
      event.target.blur();
    },
    onSubmitComment() {
      this.isEditComment = false;

      if (this.commentText === '') {
        return;
      }
      if (this.commentText === this.item.comment) {
        return;
      }

      const id = this.item.id;
      const userId = this.user.id;
      const comment = this.commentText;

      this.UPDATE_COMMENT({ id, userId, comment });
    },
    onSubmitNestedComment() {
      this.isEditNestedComment = false;

      if (this.nestedComment === '') {
        return;
      }

      const cardId = this.card.id;
      const userId = this.user.id;
      const comment = this.nestedComment;
      // 대댓글은 무조건 dept가 1임.
      const dept = '1';
      const groupNum = this.item.id;

      this.CREATE_COMMENT({ cardId, userId, comment, dept, groupNum });
      this.nestedComment = '';
    },
    onEditComment() {
      this.isEditComment = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
        this.commentText = this.item.comment;
      });
    },
    onEditNestedComment() {
      this.isEditNestedComment = true;
      this.$nextTick(() => this.$refs.nestedComment.focus());
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
    margin: 4px 2px 4px 0;
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
    &.nested {
      display: block;
      margin-bottom: 35px;
    }
  }
  .comment-side {
    display: inline;
    position: relative;
    top: 9px;
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
