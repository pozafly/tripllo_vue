<template>
  <notifications
    group="custom-template"
    :duration="5000"
    :width="500"
    animation-name="v-fade-right"
    position="top right"
  >
    <template slot="body" slot-scope="props">
      <div class="custom-template">
        <div class="custom-template-side">
          <awesome :icon="['far', 'check-circle']"></awesome>
        </div>
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ props.item.title }}
          </div>
          <div class="custom-template-text">{{ props.item.text }}</div>
        </div>
        <div class="custom-template-close" @click="props.close">
          &times;
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2],
        },
        leave: {
          opacity: 0,
          height: 0,
        },
      },
    };
  },
};
</script>

<style lang="scss">
.sub-button {
  display: inline-block;
  /* float: right; */
  background: #e54d42;
  padding: 4px;
  box-shadow: 0 5px 15px 0px rgba(46, 61, 73, 0.1);
}
.notification.n-light {
  margin: 10px;
  margin-bottom: 0;
  border-radius: 3px;
  font-size: 13px;
  padding: 10px 20px;
  color: #495061;
  background: #eaf4fe;
  border: 1px solid #d4e8fd;
  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589f3;
  }
}
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  &,
  & > div {
    box-sizing: border-box;
  }
  background: #e8f9f0;
  border: 2px solid #d0f2e1;
  .custom-template-side {
    flex: 0 1 auto;
    color: #15c371;
    font-size: 32px;
    padding: 0 10px;
  }
  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}
.v-fade-right-enter-active,
.v-fade-right-leave-active,
.v-fade-right-move {
  transition: all 0.9s;
}
.v-fade-right-enter,
.v-fade-right-leave-to {
  opacity: 0;
  transform: translateX(500px) scale(0.2);
}
</style>
