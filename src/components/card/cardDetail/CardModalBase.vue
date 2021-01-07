<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-main">
            <a class="modal-close-btn" href="" @click.prevent="onClose">
              &times;
            </a>
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
          <div class="modal-side">
            <slot name="side">
              side
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['board']),
  },
  methods: {
    onClose() {
      this.$router.push(`/board/${this.board.id}`);
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  /* overflow-y: auto; */
}
.modal-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  overflow-y: auto;

  min-width: 300px;
  max-width: 700px;
  max-height: 800px;

  width: 70%;
  height: 90%;
  font-size: 20px;

  margin: 0px auto;
  padding: 20px 30px;
  background-color: #f4f5f7;
  border-radius: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  z-index: 100;
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #bfc4ce;

    &:hover {
      background-color: #adb5bd;
    }
  }
  &::-webkit-scrollbar-track {
    background: #d9dce2;
  }
}
.modal-close-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  right: 25px;
  font-size: 24px;
  color: black;
  z-index: 999;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-main {
  min-width: 450px;
  width: 75%;
}
.modal-side {
  width: 25%;
  text-align: center;
}
</style>
