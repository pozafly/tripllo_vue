<template>
  <div class="spinner" v-if="loading">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.spinner {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 47%;
  left: 47%;
  z-index: 9999;
}
.spinner div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #339af0;
  animation: spinner 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  z-index: 9999;
}
.spinner div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
  z-index: 9999;
}
.spinner div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
  z-index: 9999;
}
.spinner div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
  z-index: 9999;
}
@keyframes spinner {
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
}
</style>
