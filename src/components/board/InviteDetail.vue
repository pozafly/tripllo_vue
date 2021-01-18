<template>
  <div class="invite-wrap">
    <div class="profile-wrap">
      <img
        v-if="member.picture !== null && member.picture !== 'null'"
        ref="img"
        class="invite-img"
      />
      <div v-else class="invite-icon">
        <awesome icon="user" class="fas fa-user svg"></awesome>
      </div>
    </div>
    <span>@{{ member.id }}</span>
  </div>
</template>

<script>
export default {
  props: ['member'],
  methods: {},
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.img) this.$refs.img.src = this.member.picture;
    });
  },
};
</script>

<style scoped lang="scss">
.invite-wrap {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  .profile-wrap {
    display: flex;
    width: 40px;
    height: 40px;
    background: cornsilk;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-right: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .invite-img {
      width: 40px;
      height: 40px;
      display: inline;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      cursor: auto;
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
