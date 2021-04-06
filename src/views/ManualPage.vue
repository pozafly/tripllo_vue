<template>
  <div class="intro-wrap">
    <div class="header-wrap">
      <div ref="header" class="fixed">
        <header>
          <ul class="title-wrap">
            <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
            <li><span class="title">Tripllo</span></li>
          </ul>
        </header>
        <div v-if="!isAuth" class="button-wrap">
          <button
            class="move-btn"
            type="button"
            @click="$router.push('/auth/login')"
          >
            Login
          </button>
          <button
            class="move-btn"
            type="button"
            @click="$router.push('/auth/signUp')"
          >
            Sign Up
          </button>
        </div>
        <div v-else class="button-wrap">
          <button class="return-btn" type="button" @click="$router.go(-1)">
            되돌아가기
          </button>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <h1 class="manual-title">🎯 간단 메뉴얼 v2.2</h1>
      <div class="content">
        <h2 class="content-title">💼 Board 생성</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/createBoard.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Title <br />
                생성하고자 하는 Board 제목을 적습니다.
              </p>
              <p>
                <span class="icon">📌</span> Disclosure status <br />
                공개범위를 지정할 수 있어요! <b>Public</b>으로 지정하면
                해시태그를 작성할 수 있습니다. 만약, <b>Private</b>으로
                지정한다면 혼자만 사용할 수 있는 Board가 만들어집니다.
              </p>
              <p>
                <span class="icon">📌</span> Hash tag <br />
                해시태그를 이용해서 자신만의 Board를 표현할 수 있어요!
              </p>
              <!-- <p>
              <span class="icon">📌</span> Color <br />
              앞으로 사용할 Board의 색상을 정해줍니다. Board가 만들어진 뒤에도
              색상을 변경할 수 있습니다.
            </p> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">📖 List, Card 만들기 & 이동</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/listAndCardMove.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Add another list and card <br />
                List와 Card를 새로 생성할 수 있어요! <br />
                제목을 입력 후 <b>Enter</b>키만 눌러주면 다음 순서로 넘어갑니다.
              </p>
              <p>
                <span class="icon">📌</span> Drag & Put! <br />
                생성한 List와 Card를 원하는 곳으로 옮겨서 정리할 수 있습니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">🔖 Card 사용하기</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/card1.gif"
              loading="lazy"
            />
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/card3.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Description & Labels
                <br />
                Description에는 간단 메모를 할 수 있으며, Labels로 Card를
                구분하기 쉽게 표시할 수 있습니다.
              </p>
              <p>
                <span class="icon">📌</span> Due Date & Comment <br />
                Due Date로 마감 시간을 꼼꼼하게! 누군가를 초대했다면, 댓글로
                정보를 공유할 수 있어요!
              </p>
              <p>
                <span class="icon">📌</span> Check list <br />
                <b>여러 개의 체크리스트</b>를 만들어 할 일 목록을 적어 봅시다.
                체크리스트의 Item은 언제든지 지우고 새로 만들 수 있으며, 수정
                가능합니다.
              </p>
              <p>
                <span class="icon">📌</span> Location <br />
                주소나 장소명을 사용해, 위치를 지도에 표시해봅시다. 같은 Board에
                지정된 위치는 한 눈에 볼 수 있어요.
              </p>
              <p>
                <span class="icon">📌</span> Attachment <br />
                10MB 이하의 파일들을 업로드 할 수 있습니다. 여러 개의 파일을
                올릴 수 있어요!
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">👩‍❤️‍👨 초대기능</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/invite.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Invite <br />
                공유하고 싶은 Board에서 Invite 버튼을 눌러 친구를 초대할 수
                있습니다!
              </p>
              <p>
                <span class="icon">📌</span> Push Message <br />
                초대 받을 사람이 접속중이라면 실시간으로 알림을 받을 수
                있습니다. 초대를 수락하면, Board를 공유하고 있는 사람들을 확인할
                수 있습니다.
              </p>
              <p>
                <span class="icon">📌</span> Invited Tap <br />
                초대된 Board는 언제든지 Invited Tap에서 확인 가능합니다!
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">🌍 Public Tap 활용하기</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/public.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Public <br />
                Public Tap에서는 다양한 Public Board를 구경할 수 있습니다.
                <b>해시태그</b>를 설정하여 다른 사람들에게 내 Board를
                공유해봅시다!
              </p>
              <p>
                <span class="icon">📌</span> Hash Tag <br />
                인기 해시태그가 Ranking에 표시됩니다. 해시태그를 검색하거나
                클릭해서 원하는 주제의 Board를 둘러볼 수 있어요!
              </p>
              <p>
                <span class="icon">📌</span> Click Like <br />
                마음에 드는 Board에 <b>좋아요</b>를 표현할 수 있습니다. 좋아요
                수가 많을수록 상단에 표시됩니다.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">🙋🏻 유저 페이지</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/profile.gif"
              loading="lazy"
            />
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/manual/email.gif"
              loading="lazy"
            />
          </li>
          <li>
            <div class="text-items">
              <p>
                <span class="icon">📌</span> Change your Infomation <br />
                오른쪽 상단의 <b>Edit profile</b>을 클릭하면 개인정보를 변경할
                수 있습니다. 프로필 사진도 변경 할 수 있어요!
              </p>
              <p>
                <span class="icon">📌</span> Find Password by Email <br />
                비밀번호를 잊어버렸다면, ID와 회원가입할 때 적었던 Email을
                입력하세요. 정보가 맞다면, 해당 Email로 <b>임시 비밀번호</b>를
                드립니다. 임시 비밀번호로 접속하시면 반드시 비밀번호를
                변경해주세요!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Footer,
  },

  computed: {
    ...mapGetters(['isAuth']),
  },

  created() {
    this.addEvent();
  },

  beforeDestroy() {
    this.removeEvent();
  },

  methods: {
    addEvent() {
      window.addEventListener('scroll', this.handleScroll);
    },
    removeEvent() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      if (window.scrollY === 0) {
        this.$refs.header.style.background = 'none';
      } else {
        this.$refs.header.style.background = 'rgba(0,0,0,0.4)';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.intro-wrap {
  height: 100%;
  width: 100%;
  color: #172b4d;
  .header-wrap {
    position: fixed;
    background: #06beb6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #0979bf,
      #4f68c5
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #0979bf,
      #4f68c5
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90px;
    .fixed {
      transition: all 0.8s ease;
      height: 90px;
      width: 100%;
      position: fixed;
      background: linear-gradient(to right, #0979bf, #4f68c5);
      header {
        font-family: 'Pacifico', cursive;
        color: #fff;
        display: flex;
        justify-content: center;
        font-size: 2rem;
        align-items: center;
        height: 90px;
        .title-wrap {
          margin: 32px 0;
          padding: 0.1rem;
          display: flex;
          position: relative;
          .fas.fa-suitcase {
            font-size: 3rem;
            padding-right: 0.3rem;
          }
        }
      }
      .button-wrap {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 180px;
        top: 25px;
        right: 20px;
        .move-btn {
          width: 85px;
          height: 40px;
          box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
          background-color: #43ab5f;
          &:hover {
            filter: brightness(90%);
          }
        }
        .return-btn {
          width: 85px;
          height: 40px;
          box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
          background-color: #43ab5f;
          position: relative;
          right: -80px;
        }
      }
    }
  }
  .content-wrap {
    height: auto;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 70px auto;
    .manual-title {
      font-weight: 700;
      margin-bottom: 80px;
      font-size: 40px;
    }
    .content {
      padding: 15px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
      border-radius: 6px;
      margin: 13px;
      width: 900px;
      .content-title {
        margin-left: 55px;
        font-size: 25px;
      }
      .content-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          margin: 0 43px;
          width: 450px;
          img {
            width: 400px;
            margin: 30px 0;
            border-radius: 10px;
          }
          .text-items {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100%;
            p {
              margin-top: 30px;
              line-height: 1.6;
              word-break: keep-all;
              font-weight: 400;
              .icon {
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
