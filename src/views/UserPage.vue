<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <main>
      <template v-if="!formSwich">
        <LoginForm @changeForm="changeForm" />
      </template>

      <template v-else>
        <SignUpForm @changeForm="changeForm" />
      </template>
    </main>
    <aside>
      <a href="">Privacy Policy</a>
    </aside>
    <div class="back">
      <img class="back item1" src="@/assets/user/back/1.png" alt="" />
      <img class="back item2" src="@/assets/user/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/user/LoginForm.vue';
import SignUpForm from '@/components/user/SignUpForm.vue';

export default {
  data() {
    return {
      formSwich: false,
    };
  },
  components: {
    LoginForm,
    SignUpForm,
  },
  methods: {
    changeForm() {
      this.formSwich = !this.formSwich;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
header {
  font-family: 'Pacifico', cursive;
  color: #0282ce;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  padding: 3rem;
  align-items: center;
}
header .fas.fa-suitcase {
  font-size: 3rem;
  padding-right: 0.3rem;
}
main {
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  flex-direction: column;
  align-items: center;
  display: block;
  max-width: 585px;
  margin: 0 auto;
  position: relative;
}
.page {
  display: flex;
  flex-direction: column;
}
.page aside {
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
  font-size: 0.9rem;
}
.back {
  position: fixed;
  bottom: 2rem;
  width: 30rem;
  z-index: -1;
}
.back .item1 {
  left: 0;
}
.back .item2 {
  right: 0;
}
</style>
