<template>
  <div class="base-wrap" ref="sideWrap">
    <div class="header">
      <slot name="header" class="header-text">header</slot>
      <a @click="$emit('close')" class="header-cancle">&times;</a>
    </div>
    <div class="content">
      <slot name="content">content</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['xy'],
  mounted() {
    const x = this.xy.x - 1000;
    const y = this.xy.y - 30;
    this.$refs.sideWrap.style.left = `${x}px`;
    this.$refs.sideWrap.style.top = `${y}px`;
  },
};
</script>

<style scoped lang="scss">
.base-wrap {
  display: block;
  position: absolute;
  background: white;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  box-sizing: border-box;
  overflow: hidden;
  width: 300px;
  height: auto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #5e6c84;
  left: 8px;
  z-index: 99;
  .header {
    height: 40px;
    position: relative;
    margin-bottom: 8px;
    text-align: center;
    display: block;
    .header-text {
      display: block;
      position: relative;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid rgba(9, 30, 66, 0.13);
      margin: 0 12px;
      padding: 0 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index: 1;
    }
    .header-cancle {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      vertical-align: bottom;
      color: #6b778c;
      padding: 10px 12px 10px 8px;
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      font-size: 16px;
      line-height: 20px;
      width: 20px;
      z-index: 2;
      cursor: pointer;
      &:hover {
        font-weight: 900;
      }
    }
  }
  .content {
    font-size: 12px;
    text-align: left;
    max-height: 808px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 12px 12px;
    padding: 0 12px 12px;
  }
}
</style>
