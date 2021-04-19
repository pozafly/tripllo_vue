<template>
  <div class="page">
    <CommonHeader />
    <div class="main-wrap">
      <MainTap @changeTap="changeTap" />
      <template v-if="mainTapId === 0">
        <PersonalSection />
      </template>
      <template v-else-if="mainTapId === 1">
        <InvitedSection />
      </template>
      <template v-else>
        <PublicSection />
      </template>
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/header/CommonHeader.vue';
import MainTap from '@/components/mainPage/MainTap.vue';
import PersonalSection from '@/components/mainPage/section/PersonalSection.vue';
import InvitedSection from '@/components/mainPage/section/InvitedSection.vue';
import PublicSection from '@/components/mainPage/section/PublicSection.vue';
import { getSessionStorage } from '@/utils/webStorage';

export default {
  components: {
    CommonHeader,
    MainTap,
    PersonalSection,
    InvitedSection,
    PublicSection,
  },

  data() {
    return {
      mainTapId: getSessionStorage('mainTapId'),
    };
  },

  methods: {
    changeTap(value) {
      this.mainTapId = value;
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  margin-top: -40px;
  padding-top: 40px;
  box-sizing: border-box;
  .main-wrap {
    height: auto;
    min-height: 80%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    position: relative;
  }
}
</style>
