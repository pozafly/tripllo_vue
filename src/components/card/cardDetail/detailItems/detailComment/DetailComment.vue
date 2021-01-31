<template>
  <li class="body-item">
    <div>
      <awesome icon="comments" class="fas fa-comments"></awesome>
      <span class="body-card-text">Comments</span>
      <div v-for="item in comment" :key="item.id">
        <div
          :class="{
            'comments-display': item.dept === 0,
            'comments-display active': item.dept === 1,
          }"
        >
          <div>
            <span class="profile-wrap" v-if="!item.picture">
              <awesome icon="user" class="fas fa-user"></awesome>
            </span>
            <span
              :style="{ backgroundImage: `url(${item.picture})` }"
              class="user-picture"
              v-else
            ></span>

            <span class="comment-createdBy">@{{ item.createdBy }}</span>

            <!-- 대댓글이 달린 댓글이 삭제 되었을 때는 update만 친다. 댓글이 삭제 되었습니다. 라고. -->
            <template v-if="item.deleteYn === 'N'">
              <span class="comment-createdAt" v-if="!item.updatedAt">
                {{ item.createdAt | timeForToday }}
              </span>
              <span class="comment-createdAt" v-else>
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
            <SideComment :item="item" />
          </div>
        </div>
      </div>
      <textarea
        class="form-control comment-input textarea"
        ref="input"
        v-model="commentText"
        v-if="isComment"
        :readonly="!isComment"
        spellcheck="false"
        @blur="onSubmitComment"
        @keypress.enter="onKeyupEnter"
      />
      <textarea
        v-else
        class="form-control comment-input"
        @click="onEditComment"
        spellcheck="false"
        placeholder="Write a comment..."
      >
      </textarea>
      <template v-if="isComment">
        <button class="comment-input-btn" @click="onSubmitComment">Save</button>
        <a href="" class="input-cancel" @click.prevent="isComment = false">
          &times;
        </a>
      </template>
    </div>
  </li>
</template>

<script>
import SideComment from './SideComment';
import { mapActions, mapState } from 'vuex';

export default {
  components: { SideComment },
  data() {
    return {
      isComment: false,
      commentText: '',
    };
  },
  computed: {
    ...mapState(['card', 'comment', 'user']),
  },
  methods: {
    ...mapActions(['CREATE_COMMENT']),
    onSubmitComment({ relatedTarget }) {
      this.isComment = false;
      // body를 눌렀을 때, 이벤트 타겟이 null로 나오므로 그냥 통과(저장된단 말임.)
      if (relatedTarget) {
        if (relatedTarget.className === 'input-cancel') return; // x버튼을 눌렀을 때는 return
      }
      if (this.commentText === '') return;
      const cardId = this.card.id;
      const userId = this.user.id;
      const comment = this.commentText;
      this.CREATE_COMMENT({ cardId, userId, comment });
      this.commentText = '';
    },
    onKeyupEnter() {
      event.target.blur();
    },
    onEditComment() {
      this.isComment = true;
      this.$nextTick(() => this.$refs.input.focus());
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
