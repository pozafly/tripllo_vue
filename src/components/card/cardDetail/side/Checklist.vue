<template>
  <SideBase @close="$emit('close')" :xy="xy">
    <div slot="header" class="header-text">Checklist</div>
    <div slot="content">f</div>
  </SideBase>
</template>

<script>
import SideBase from './SideBase';

export default {
  components: {
    SideBase,
  },
  props: ['xy'],
};
</script>

<style></style>
