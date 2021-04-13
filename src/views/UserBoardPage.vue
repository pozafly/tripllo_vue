<template>
  <div class="wrap">
    <CommonHeader />
    <div class="content">
      <div class="user-header">
        <div class="auth-items">
          <span
            v-if="userInfo.picture !== null && userInfo.picture !== 'null'"
            class="auth-item img"
            :style="{ backgroundImage: `url(${userInfo.picture})` }"
            @click.prevent="menuShow"
          ></span>
          <div v-else class="icon-wrap">
            <awesome icon="user" class="fas fa-user auth-item"></awesome>
          </div>
          <span class="auth-item name">{{ userInfo.name }}</span>
          <span class="auth-item id">@{{ userInfo.id }}</span>
        </div>
        <span v-if="userInfo.bio" class="bio">{{ userInfo.bio }}</span>
        <span v-else class="bio">작성된 Bio가 없습니다..</span>
      </div>
      <div class="user-info">
        <div class="info-wrap">
          <span class="info-text">
            <awesome icon="globe-americas" class="icon" /> Board List
          </span>
          <div ref="boardItem" class="info-inside">
            <div
              v-for="board in userBoards"
              :key="board.id"
              class="board-list"
              :lastCreatedAt="board.createdAt"
            >
              <BoardItem :board="board" />
            </div>
          </div>
        </div>
        <div class="infinity">
          <infinite-loading spinner="waveDots" @infinite="infiniteHandler">
            <div
              slot="no-more"
              style="color: rgb(102, 102, 102); font-size: 14px; padding: 10px 0px;"
            >
              목록의 끝입니다 :)
            </div>
          </infinite-loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/header/CommonHeader.vue';
import BoardItem from '@/components/board/BoardItem.vue';
import { readSearchUserBoard } from '@/api/board';
import { readUser } from '@/api/user';

export default {
  components: {
    CommonHeader,
    BoardItem,
  },

  data() {
    return {
      userBoards: [],
      userInfo: {},
      lastCreatedAt: 'firstCall',
      isInfinity: true,
    };
  },

  created() {
    this.readUser();
  },

  methods: {
    readUser() {
      readUser(this.$route.params.userId)
        .catch(error => {
          console.log(error);
          alert('유저 정보를 가져오지 못했습니다.');
        })
        .then(({ data }) => {
          this.userInfo = data.data;
        });
    },

    infiniteHandler($state) {
      const searchUserId = this.$route.params.userId;
      const lastCreatedAt = this.lastCreatedAt;

      readSearchUserBoard(searchUserId, lastCreatedAt)
        .then(({ data }) => {
          if (data.data === null) {
            this.isInfinity = false;
            $state.complete(); // 데이터는 모두 소진되고 다시 가져올 필요가 없다는 것을 알려준다.
          } else {
            this.userBoards = this.userBoards.concat(data.data);

            setTimeout(() => {
              const boardItem = data.data;
              const lastEl = boardItem[boardItem.length - 1];

              this.lastLikeCount = lastEl.likeCount;
              this.lastCreatedAt = lastEl.createdAt;

              $state.loaded(); // 계속 데이터가 남아있다는 것을 infinity에게 알려준다.
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
          alert('유저 보드를 가져오지 못했습니다.');
        });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  min-height: 100%;
  background-color: #fff;
  .content {
    height: 100%;
    min-height: 100%;
    position: relative;
    overflow-y: auto;
    margin: -40px auto;
    padding: 40px 0 0 0;
    box-sizing: border-box;
    .user-header {
      background-color: #f4f5f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      padding: 32px 0 70px;
      position: relative;
      .auth-items {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 20px 0;
        .icon-wrap {
          position: relative;
          background: #339af0;
          height: 60px;
          width: 60px;
          color: #fff;
          margin-right: 16px;
          border-radius: 50%;
          .fa-user {
            position: relative;
            height: 30px;
            width: 30px;
            left: 7px;
            top: 5px;
          }
        }
        .auth-item {
          background-color: transparent;
          display: inline-block;
          padding: 8px 8px;
          text-align: center;
          text-decoration: none;
          border-radius: 100px;
          &.img {
            width: 40px;
            height: 40px;
            border-radius: 90px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 16px;
          }
          &.name {
            font-size: 24px;
            font-weight: 500;
            line-height: 28px;
            color: #0c3953;
          }
          &.id {
            font-size: 12px;
            line-height: 20px;
            color: #5e6c84;
          }
        }
      }
      .bio {
        display: block;
        text-align: center;
        font-size: 11.5px;
        color: #5e6c84;
      }
    }
    .user-info {
      position: relative;
      width: 100%;
      margin: 0px auto;
      top: -23px;
      .info-wrap {
        position: relative;
        margin: 0 auto;
        max-width: 850px;
        height: 100%;
        .info-text {
          position: relative;
          top: -5px;
          left: 6px;
          color: #0c3953;
          border-radius: 15px 15px 0 0;
          background-color: #fff;
          padding: 10px;
          font-size: 13px;
        }
        .info-inside {
          margin: 80px 0;
          height: 100%;
          width: 100%;
          width: 900px;
          display: flex;
          flex-wrap: wrap;
          .board-list {
            display: table-cell;
            min-width: 180px;
            padding: 7px;
          }
        }
        .infinity {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
