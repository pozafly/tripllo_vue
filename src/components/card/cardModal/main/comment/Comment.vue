<template>
  <li class="body-item">
    <div>
      <awesome icon="comment" class="fas fa-comments"></awesome>
      <span class="body-card-text">Comments</span>
      <div v-for="item in comment" :key="item.id">
        <div
          :class="{
            'comments-display': item.dept === 0,
            'comments-display active': item.dept === 1,
          }"
        >
          <div>
            <span v-if="!item.picture" class="profile-wrap">
              <awesome icon="user" class="fas fa-user"></awesome>
            </span>
            <span
              v-else
              :style="{ backgroundImage: `url(${item.picture})` }"
              class="user-picture"
            ></span>

            <span class="comment-createdBy">@{{ item.createdBy }}</span>

            <!-- 대댓글이 달린 댓글이 삭제 되었을 때는 update만 친다. 댓글이 삭제 되었습니다. 라고. -->
            <template v-if="item.deleteYn === 'N'">
              <span v-if="!item.updatedAt" class="comment-createdAt">
                {{ item.createdAt | timeForToday }}
              </span>
              <span v-else class="comment-createdAt">
                {{ item.updatedAt | timeForToday }} (수정됨)
              </span>
            </template>
            <template v-else>
              <span class="comment-createdAt">
                {{ item.updatedAt | timeForToday }} (삭제됨)
              </span>
            </template>
          </div>
          <div class="side-comment">
            <CommentEdit v-bind="item" :read-comment="readComment" />
          </div>
        </div>
      </div>
      <textarea
        v-if="isComment"
        ref="input"
        v-model="commentText"
        class="form-control comment-input textarea"
        :readonly="!isComment"
        spellcheck="false"
        @blur="onSubmitComment"
        @keypress.enter="onKeyupEnter"
      />
      <textarea
        v-else
        class="form-control comment-input"
        spellcheck="false"
        placeholder="Write a comment..."
        @click="onEditComment"
      >
      </textarea>
      <template v-if="isComment">
        <button
          class="comment-input-btn"
          type="button"
          @click="onSubmitComment"
        >
          Save
        </button>
        <a href="" class="input-cancel" @click.prevent="isComment = false">
          &times;
        </a>
      </template>
    </div>
  </li>
</template>

<script>
import CommentEdit from '@/components/card/cardModal/main/comment/CommentEdit.vue';
import { readCommentAPI, createCommentAPI } from '@/api/comment';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    CommentEdit,
  },

  data() {
    return {
      isComment: false,
      commentText: '',
      comment: {},
      cardId: this.$route.params.cardId * 1,
    };
  },

  computed: {
    ...mapState(['board']),
  },

  created() {
    this.readComment();
  },

  methods: {
    ...mapActions(['READ_BOARD_DETAIL']),

    readComment() {
      readCommentAPI(this.cardId)
        .then(({ data }) => {
          this.comment = data.data;
          this.READ_BOARD_DETAIL(this.board.id);
        })
        .catch(error => {
          console.log(error);
          alert('코멘트를 읽어오지 못했습니다.');
        });
    },

    onSubmitComment({ relatedTarget }) {
      this.isComment = false;
      // body를 눌렀을 때, 이벤트 타겟이 null로 나오므로 그냥 통과(저장된단 말임.)
      if (relatedTarget) {
        if (relatedTarget.className === 'input-cancel') {
          return; // x버튼을 눌렀을 때는 return
        }
      }
      if (this.commentText === '') {
        return;
      }

      const cardId = this.cardId;
      const comment = this.commentText;
      createCommentAPI({ cardId, comment })
        .then(() => {
          this.readComment();
          this.READ_BOARD_DETAIL(this.board.id);
        })
        .catch(error => {
          console.log(error);
          alert('코멘트를 생성하지 못했습니다.');
        });
      this.commentText = '';
      this.scrollAction();
    },

    onKeyupEnter(event) {
      event.target.blur();
    },

    onEditComment() {
      this.isComment = true;
    },

    scrollAction() {
      setTimeout(() => {
        this.$el.scrollIntoView(false);
      }, 100);
    },
  },
};
</script>

<style scoped lang="scss">
.comment-input {
  display: block;
  margin: 13px 0 7px 35px;
  width: 92%;
  overflow-wrap: break-word;
  resize: none;
  height: 32px;
  border: none;
  font-family: Arial;
  font-size: 14px;
  cursor: pointer;
  background: rgba(9, 30, 66, 0.04);
  overflow: hidden;
  overflow-wrap: break-word;
  outline: none;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
  }
  &.textarea {
    height: 32px;
    background: #dbdfe4;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
    outline: none;
  }
}
.comment-input-btn {
  display: inline;
  margin: 0 0 10px 27px;
  width: 55px;
  height: 33px;
  position: relative;
  left: 8px;
  &:hover {
    filter: brightness(90%);
  }
}
.input-cancel {
  margin-left: 20px;
  font-size: 20px;
  color: black;
  &:hover {
    font-weight: 700;
  }
}
.comments-display {
  display: block;
  margin: 13px 0 17px 35px;
  width: 92%;
  overflow-wrap: break-word;
  position: relative;
  &.active {
    margin: 0 0 0 74px;
    &:before {
      position: absolute;
      left: -26px;
      top: -34px;
      border-radius: 0 0 0 10px;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      content: '|||';
      color: #f4f5f7;
      padding-top: 23px;
    }
  }
  .side-comment {
    margin-top: 5px;
    margin-left: 42px;
  }
  .profile-wrap {
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    border-radius: 50%;
    padding: 4px 9px;
  }
  .user-picture {
    padding: 3px 14px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .comment-createdBy {
    position: relative;
    top: 3px;
    font-size: 14px;
    margin-left: 8px;
  }
  .comment-createdAt {
    position: relative;
    top: 3px;
    font-size: 12px;
    margin-left: 13px;
  }
}
</style>
