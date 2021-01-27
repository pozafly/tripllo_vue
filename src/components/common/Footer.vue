<template>
  <footer>
    <awesome icon="suitcase" class="fas fa-suitcase footer-item"></awesome>
    <span class="footer-item">
      Tripllo Coded and maintained with ❤️ by
      <a
        href="https://github.com/pozafly"
        target="_sub"
        class="footer-item-link"
      >
        pozafly
      </a>
      © 2021
    </span>
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .fas.fa-suitcase.footer-item {
    margin-right: 3px;
  }
  .footer-item-link {
    margin-right: 3px;
    &:hover {
      filter: brightness(70%);
    }
  }
}
</style>
