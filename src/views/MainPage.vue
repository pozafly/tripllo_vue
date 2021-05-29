<template>
  <div class="page">
    <CommonHeader />
    <main class="main-wrap">
      <MainTab @changeTab="changeTab" />
      <template v-if="mainTabId === 0">
        <PersonalSection />
      </template>
      <template v-else-if="mainTabId === 1">
        <InvitedSection />
      </template>
      <template v-else>
        <PublicSection />
      </template>
    </main>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/header/CommonHeader.vue';
import MainTab from '@/components/mainPage/MainTab.vue';
import PersonalSection from '@/components/mainPage/section/PersonalSection.vue';
import InvitedSection from '@/components/mainPage/section/InvitedSection.vue';
import PublicSection from '@/components/mainPage/section/PublicSection.vue';
import { getSessionStorage } from '@/utils/webStorage';

export default {
  components: {
    CommonHeader,
    MainTab,
    PersonalSection,
    InvitedSection,
    PublicSection,
  },

  data() {
    return {
      mainTabId: getSessionStorage('mainTabId'),
    };
  },

  methods: {
    changeTab(value) {
      this.mainTabId = value;
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  height: auto;
  margin-top: -40px;
  padding-top: 40px;
  box-sizing: border-box;
  position: relative;
  top: 40px;
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
