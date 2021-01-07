<template>
  <SideBase @close="$emit('close')">
    <div slot="header" class="header-text">Duedate</div>
    <div slot="content">f</div>
  </SideBase>
</template>

<script>
import SideBase from './SideBase';

export default {
  components: {
    SideBase,
  },
};
</script>

<style></style>
