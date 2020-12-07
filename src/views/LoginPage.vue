<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <main>
      <span>Log in to Tripllo</span>
      <form class="form">
        <div class="input">
          <input type="text" />
          <input type="text" />
          <button type="submit">Log in</button>
        </div>
        <span>OR</span>
      </form>
      <div class="external-login">
        <button>Continue with Google</button>
        <button>Continue with FaceBook</button>
        <button>Continue with Naver</button>
      </div>
    </main>
    <aside>
      <a href="">Privacy Policy</a>
    </aside>
    <footer>
      <div class="logo">
        <i class="fas fa-suitcase"></i>
        <span>Tripllo</span>
        <span>
          Coded and maintained with ❤️ by <a href="#">pozafly</a> © 2020
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
* {
  border: 1px solid black;
}
.page {
  background: #f9fafc;
}
header {
  font-family: 'Pacifico', cursive;
  color: #0282ce;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding: 3rem;
  align-items: center;
}
header .fas.fa-suitcase {
  font-size: 4rem;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.input > input,
.input > button {
  display: flex;
  margin: 2rem;
  flex-direction: column;
  align-items: space-between;
}
</style>
