<template>
  <div class="page">
    <Header />
    <div class="main-wrap">
      <SideNavTap />
      <template v-if="mainTapId === 0">
        <PersonalSection />
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
import PublicSection from '@/components/main/PublicSection';
import { mapState } from 'vuex';

export default {
  components: { Header, SideNavTap, PersonalSection, PublicSection },
  computed: {
    ...mapState(['mainTapId']),
  },
  mounted() {
    console.log(this.mainTapId);
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
