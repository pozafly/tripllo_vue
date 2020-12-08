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
              <b> Continue with Google</b>
            </button>
            <button class="external_item">
              <img src="@/assets/logo/facebook.png" />
              <b> Continue with FaceBook</b>
            </button>
            <button class="external_item">
              <img src="@/assets/logo/naver.png" />
              <b> Continue with Naver</b>
            </button>
          </div>
        </div>
      </main>
    </div>
    <aside>
      <a href="">Privacy Policy</a>
    </aside>
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
  display: flex;
  flex-direction: column;
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
  font-size: 2rem;
  padding: 3rem;
  align-items: center;
}
header .fas.fa-suitcase {
  font-size: 3rem;
  padding-right: 0.3rem;
}
.main_container {
  display: flex;
  justify-content: center;
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
main .container {
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 23rem;
  padding: 2rem;
}
main .container .login_text {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #5e6c84;
}
main .container .submit_items {
  display: flex;
  flex-direction: column;
  height: 11rem;
  justify-content: space-around;
}
main .container .submit_items .submit_item {
  height: 2.3rem;
}
main .container .text {
  text-align: center;
  font-size: 0.8rem;
  margin-top: 1rem;
}
main .container .external_login_container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  margin-top: 1rem;
}
img {
  width: 1.3rem;
  padding-right: 0.3rem;
}
main .container .external_login_container .external_item {
  background: #fff;
  color: rgba(0, 0, 0, 0.54);
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 5px 0;
  border-color: transparent;
  border-radius: 3px;
  width: 99%;
  height: 39px;
  padding-top: 0;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
main .container .external_login_container .external_item:hover {
  background-color: #f9fafc;
}
.page aside {
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
  font-size: 0.9rem;
}
</style>
