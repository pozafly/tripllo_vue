<template>
  <!-- template for the modal component -->
  <transition name="modal">
    <div class="modal-mask-addBoard">
      <div class="modal-wrapper-addBoard">
        <div class="modal-container-addBoard">
          <div class="modal-header-addBoard">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body-addBoard">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer-addBoard">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-mask-addBoard {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper-addBoard {
  display: table-cell;
  vertical-align: middle;
}
.modal-container-addBoard {
  width: 300px;
  margin: 0px auto;
  padding: 17px 30px;
  background-color: #f4f5f7;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header-addBoard h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body-addBoard {
  margin: 20px 30px;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container-addBoard,
.modal-leave-active .modal-container-addBoard {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
