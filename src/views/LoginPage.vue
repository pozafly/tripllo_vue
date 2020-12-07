<template>
  <div class="page">
    <header>
      <i class="fas fa-suitcase"></i>
      <span class="title">Tripllo</span>
    </header>
    <div class="main_container">
      <main>
        <div class="container">
          <span class="login_text"><b>Log in to Tripllo</b></span>
          <form>
            <div class="submit_items">
              <input
                class="submit_item"
                type="text"
                placeholder="Enter email"
              />
              <input
                class="submit_item"
                type="text"
                placeholder="Enter password"
              />
              <button class="submit_item btn" type="submit">
                <b>Log in</b>
              </button>
            </div>
            <div class="text">OR</div>
          </form>
          <div class="external_login_container">
            <button class="external_item">
              <img src="@/assets/logo/google.png" />
              Continue with Google
            </button>
            <button class="external_item">
              <img src="@/assets/logo/facebook.png" />
              Continue with FaceBook
            </button>
            <button class="external_item">
              <img src="@/assets/logo/naver.png" />
              Continue with Naver
            </button>
          </div>
        </div>
      </main>
    </div>
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
  /* border: 1px solid black; */
}
button {
  border: 0;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
}
.page {
  background: #f9fafc;
}
.btn {
  background: #5aac44;
  color: white;
}
.btn:hover {
  background: #60bd4e;
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
.main_container {
  display: flex;
  justify-content: center;
}
main {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
}
main .container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 23rem;
  padding: 2rem;
}
main .container .login_text {
  text-align: center;
  font-size: 1.2rem;
}
main .container .submit_items {
  display: flex;
  flex-direction: column;
  height: 14rem;
  justify-content: space-around;
}
main .container .submit_items .submit_item {
  height: 2.3rem;
}
main .container .text {
  text-align: center;
  font-size: 0.8rem;
}
main .container .external_login_container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 14rem;
}
img {
  width: 1.3rem;
  padding-right: 0.3rem;
}
main .container .external_login_container .external_item {
  height: 2.3rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
