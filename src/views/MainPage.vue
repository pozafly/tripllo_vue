<template>
  <div class="page">
    <CommonHeader />
    <div class="main-wrap">
      <NavTap @changeTab="changeTab" />
      <template v-if="mainTabId === 0">
        <PersonalSection />
      </template>
      <template v-else-if="mainTabId === 1">
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
import NavTap from '@/components/main/NavTap.vue';
import PersonalSection from '@/components/main/PersonalSection.vue';
import InvitedSection from '@/components/main/InvitedSection.vue';
import PublicSection from '@/components/main/PublicSection.vue';
import { getSessionStorage } from '@/utils/webStorage';

export default {
  components: {
    CommonHeader,
    NavTap,
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
