<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <LoginForm />
    <aside>
      <a href="">Privacy Policy</a>
    </aside>
    <div class="back">
      <img class="back item1" src="@/assets/login/back/1.png" alt="" />
      <img class="back item2" src="@/assets/login/back/2.png" alt="" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue';

export default {
  components: {
    LoginForm,
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
