<template>
  <div class="contaier">
    <footer>
      <div class="wrapper">
        <i class="fas fa-suitcase"></i>
        <span> Tripllo</span>
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
.contaier {
  font-size: 0.9rem;
  display: flex;
  flex-direction: column-reverse;
}
footer {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.wrapper {
}
</style>
