<template>
  <transition name="modal">
    <div class="location-modal-mask">
      <div class="location-modal-wrapper">
        <div class="location-modal-container">
          <div class="location-modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="location-modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style>
.location-modal-mask {
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

.location-modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.location-modal-container {
  position: relative;
  min-width: 120px;
  width: 97%;
  height: 90%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.location-modal-header h3 {
  position: relative;
  margin-top: 0;
  color: #42b983;
  width: 100%;
  height: 100%;
}

.location-modal-body {
  width: 100%;
  height: 100%;
}

.location-modal-default-button {
  float: right;
}

.location-modal-enter {
  opacity: 0;
}

.location-modal-leave-active {
  opacity: 0;
}

.location-modal-enter .location-modal-container,
.location-modal-leave-active .location-modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
