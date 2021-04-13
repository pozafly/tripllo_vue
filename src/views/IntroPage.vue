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
        <div class="button-wrap">
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
      </div>
      <main>
        <div class="main-wrap">
          <div class="main-text">
            <p class="main-text-item text1">
              Tripllo는 이슈트래커인 웹기반 Trello 어플리케이션을 Clone한
              <br />웹 어플리케이션 입니다.
            </p>
            <p class="main-text-item text2">
              가볍게 계획을 세워야 할 때, 세운 계획을 Team과 공유하고 싶을 때
              사용할 수 있습니다.
            </p>
          </div>
          <img
            src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/main4.jpg"
            class="img img2"
          />
        </div>
        <div class="space"></div>
        <div class="main-wrap main2">
          <div class="main-text">
            <p class="main-text-item text3">카드 속 다양한 기능</p>
            <p class="main-text-item text4">
              계획을 세우기 유용하도록 <br />
              몇 가지 기능이 포함되어 있습니다.
            </p>
            <ul class="list">
              <li class="list">라벨링</li>
              <li class="list">체크리스트</li>
              <li class="list">마감시간</li>
              <li class="list">파일업로드</li>
              <li class="list">위치지정</li>
            </ul>
          </div>
          <img
            src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/main3.jpg"
            class="img img3"
          />
        </div>
        <div class="space"></div>
        <div class="main-wrap">
          <div class="main-text">
            <p class="main-text-item text5">사용한 기술</p>
          </div>
        </div>
        <ul class="skill">
          <li class="skill-item">
            <div class="vue">
              <img
                src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/vue.png"
                class="img4"
              />
            </div>
            <div class="content-wrap">
              <span class="skill-title">Front-end</span>
              <ul class="skill-list">
                <li class="skill-list">Vue 2.6.11 + Vuex + Vue-router</li>
                <li class="skill-list">scss</li>
                <li class="skill-list">webpack</li>
                <li class="skill-list">axios</li>
                <li class="skill-list">
                  dragula
                  <a href="https://bevacqua.github.io/dragula/"
                    >(https://bevacqua.github.io/dragula/)</a
                  >
                </li>
                <li class="skill-list">sockjs-client</li>
                <li class="skill-list">Font awesome</li>
              </ul>
            </div>
          </li>
          <li class="skill-item">
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
              class="img5"
            />
            <div class="content-wrap">
              <span class="skill-title">Back-end</span>
              <ul class="skill-list">
                <li class="skill-list">
                  SpringBoot 2.1.9
                  <ul li class="skill-list-inside">
                    <li li class="skill-list-inside">Spring Security + JWT</li>
                    <li li class="skill-list-inside">Websocket</li>
                    <li li class="skill-list-inside">Swagger 2</li>
                    <li li class="skill-list-inside">Spring Mail</li>
                    <li li class="skill-list-inside">Spring Cloud-AWS</li>
                  </ul>
                </li>
                <li class="skill-list">Mysql 8.0.22</li>
                <li class="skill-list">MyBatis</li>
              </ul>
            </div>
          </li>
          <li class="skill-item">
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/aws.jpg"
              class="img5"
            />
            <div class="content-wrap">
              <span class="skill-title">Deploy</span>
              <ul class="skill-list">
                <li class="skill-list">AWS-EC2 (Amazon Linux 2)</li>
                <li class="skill-list">AWS-RDS</li>
                <li class="skill-list">AWS-S3</li>
                <li class="skill-list">CodeDeploy</li>
                <li class="skill-list">Travis</li>
                <li class="skill-list">Nginx</li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="side-btn">
          <button
            class="side-btn-item"
            type="button"
            @click="$router.push('/manual')"
          >
            Tripllo 사용설명서
          </button>
          <div class="code">
            <button
              class="side-btn-item"
              type="button"
              @click="goPage('https://github.com/pozafly/tripllo_vue')"
            >
              Tripllo_vue GITHUB
            </button>
            <button
              class="side-btn-item"
              type="button"
              @click="goPage('https://github.com/pozafly/tripllo_springBoot')"
            >
              Tripllo_SpringBoot GITHUB
            </button>
          </div>
        </div>
        <div class="footer">
          <Footer />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/common/CommonFooter.vue';

export default {
  components: {
    Footer,
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

    goPage(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped lang="scss">
.intro-wrap {
  height: 100%;
  .header-wrap {
    position: relative;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
      }
    }

    main {
      margin-top: 170px;
      width: 1100px;
      height: 630px;
      .main-wrap {
        display: flex;
        justify-content: space-between;
        &.main2 {
          flex-direction: row-reverse;
        }
        .main-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .main-text-item {
            color: #fff;
            width: 500px;
            word-break: keep-all;
            &.text1 {
              font-weight: 680;
              font-size: 35px;
            }
            &.text2 {
              font-size: 25px;
              font-weight: 300;
            }
            &.text3 {
              font-weight: 680;
              font-size: 35px;
              color: #364865;
            }
            &.text4 {
              color: #364865;
              font-size: 25px;
              font-weight: 300;
            }
            &.text5 {
              width: auto;
              color: #364865;
              font-size: 35px;
              font-weight: 680;
            }
          }
          .list {
            margin-left: 15px;
            padding: 5px;
            list-style: disc !important;
            color: #364865;
          }
        }
        .img {
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.5) 0 0 19px;
          &.img2 {
            width: 500px;
            height: 576.156px;
          }
          &.img3 {
            width: 500px;
            height: 513.438px;
          }
        }
      }
      .skill {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        .skill-item {
          display: flex;
          flex-direction: row;
          margin: 20px 0;
          .vue {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 200px;
            height: 200px;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
            .img4 {
              width: 140px;
              height: 140px;
            }
          }
          .img5 {
            width: 200px;
            height: 200px;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
          }
          .content-wrap {
            width: 100%;
            margin-left: 100px;
            .skill-title {
              display: block;
              margin-left: 15px;
              font-size: 25px;
              color: #364865;
              font-weight: 600;
            }
            .skill-list {
              color: #364865;
              margin-left: 18px;
              list-style: disc;
              padding: 5px;
              .skill-list-inside {
                margin-left: 18px;
                list-style: circle;
                padding: 5px;
              }
            }
          }
        }
      }
      .skill-text {
        display: flex;
        justify-content: space-evenly;
        margin: 30px 0 50px;
        font-size: 35px;
        color: #364865;
        font-size: 35px;
        font-weight: 680;
      }
      .space {
        height: 110px;
        .footer {
          position: relative;
          bottom: 1px;
        }
      }
      .side-btn {
        display: flex;
        justify-content: space-evenly;
        margin: 150px 0;
        .side-btn-item {
          width: 250px;
          height: 100px;
          font-size: 20px;
          background: #43ab5f;
          margin-left: 35px;
          border-radius: 2px;
          &:hover {
            filter: brightness(90%);
          }
        }
        .code {
          display: flex;
          width: 600px;
          .side-btn-item {
            background: #0979bf;
            margin-left: 15px;
            &:hover {
              filter: brightness(90%);
            }
          }
        }
      }
    }
  }
}
</style>
