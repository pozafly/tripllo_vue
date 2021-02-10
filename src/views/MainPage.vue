<template>
  <div class="page">
    <Header />
    <div class="main-wrap">
      <SideNavTap />
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
import Header from '@/components/common/Header';
import SideNavTap from '@/components/main/SideNavTap';
import PersonalSection from '@/components/main/PersonalSection';
import InvitedSection from '@/components/main/InvitedSection';
import PublicSection from '@/components/main/PublicSection';
import { mapState } from 'vuex';

export default {
  components: {
    Header,
    SideNavTap,
    PersonalSection,
    InvitedSection,
    PublicSection,
  },
  computed: {
    ...mapState(['mainTabId']),
  },
  mounted() {
    console.log(this.mainTabId);
  },
  updated() {
    console.log(this.mainTabId);
  },
};
</script>

<style scoped lang="scss">
.page {
  height: auto;
  margin-top: -40px;
  padding-top: 40px;
  box-sizing: border-box;
  .main-wrap {
    height: 100%;
    min-height: 80%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    position: relative;
  }
}
</style>
