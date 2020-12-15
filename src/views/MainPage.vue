<template>
  <div>
    Main
    <router-link to="/user/login" class="create-button">
      login
    </router-link>
    <router-link to="/user/signup" class="create-button">
      회원가입
    </router-link>
  </div>
</template>

<script>
export default {
  created() {
    console.log('여긴 메인페이지');
    console.log(this.$store.state);
  },
};
</script>

<style></style>
