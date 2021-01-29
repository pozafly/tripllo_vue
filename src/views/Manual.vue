<template>
  <div class="intro-wrap">
    <div class="header-wrap">
      <div class="fixed" ref="header">
        <header>
          <ul class="title-wrap">
            <li><awesome icon="suitcase" class="fas fa-suitcase"></awesome></li>
            <li><span class="title">Tripllo</span></li>
          </ul>
        </header>
        <div class="button-wrap">
          <button class="move-btn" @click="$router.push('/auth/login')">
            Login
          </button>
          <button class="move-btn" @click="$router.push('/auth/signUp')">
            Sign Up
          </button>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <h1 class="manual-title">간단 메뉴얼</h1>
      <div class="content">
        <h2 class="content-title">1. Board</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
            />
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
            />
          </li>
          <li>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">1. 회원가입</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
            />
          </li>
          <li>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">1. 회원가입</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
            />
          </li>
          <li>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
          </li>
        </ul>
      </div>
      <div class="content">
        <h2 class="content-title">1. 회원가입</h2>
        <ul class="content-item">
          <li>
            <img
              src="https://tripllo-file.s3.ap-northeast-2.amazonaws.com/static/springboot.png"
            />
          </li>
          <li>
            <p>이러이러이러한 것이다. 요러요러 한 것일 것이다.</p>
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
import Footer from '@/components/common/Footer';

export default {
  components: { Footer },
  created: function() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy: function() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY === 0) {
        this.$refs.header.style.background = 'none';
      } else this.$refs.header.style.background = 'rgba(0,0,0,0.4)';
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
    }
    .content {
      padding: 15px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0 0 19px;
      margin: 13px;
      width: 900px;
      .content-title {
        margin-left: 55px;
      }
      .content-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li {
          margin: 0 43px;
          width: 450px;
          img {
            width: 300px;
            height: 300px;
          }
          p {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
