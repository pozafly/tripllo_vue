<template>
  <SideBase @close="$emit('close')">
    <div slot="header" class="header-text">Labels</div>
    <div slot="content">
      <div class="content-text">LABELS</div>
      <div class="label">
        <a
          :data-value="label"
          @click.prevent="onSelectLabels"
          v-for="label in labels"
          :key="label"
          class="label-item"
          :style="{ backgroundColor: label }"
        >
          <!-- colorArray에 담았으니 거기서 label값을 포함하고 있으면 표시해라. -->
          <span v-if="colorArray.includes(label)">&or;</span>
        </a>
      </div>
    </div>
  </SideBase>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SideBase from './SideBase';

export default {
  components: { SideBase },
  data() {
    return {
      labels: {
        red: '#fa5252',
        orange: '#fd7e14',
        yellow: '#ffa500',
        green: '#4AC06A',
        blue: '#339af0',
        indigo: '#5c7cfa',
        violet: '#7950f2',
        black: '#3a4142',
      },
      colorArray: [],
    };
  },
  mounted() {
    // 밑에서 join으로 만든 문자열을 받아와서 split으로 다시 array로 만든다.
    if (!this.card.labelColor) return;
    const array = this.card.labelColor.split(',');
    this.colorArray = array;
  },
  computed: {
    ...mapState(['card']),
  },
  methods: {
    ...mapActions(['UPDATE_CARD']),
    onSelectLabels(el) {
      const colorValue = el.target.dataset.value;

      // 없다면 push해라
      if (!this.colorArray.includes(colorValue)) {
        if (this.colorArray.includes('')) {
          this.colorArray.pop();
        }
        this.colorArray.push(colorValue);
      } else {
        // 있다면 빼라
        const idx = this.colorArray.indexOf(colorValue);
        if (idx > -1) this.colorArray.splice(idx, 1);
      }
      // join을 사용하여 문자열로 만든다.
      const labelColor = this.colorArray.join(',');
      this.UPDATE_CARD({ id: this.card.id, labelColor });
    },
  },
};
</script>

<style lang="scss">
.label {
  /* border: 1px solid black; */
  height: auto;
  .label-item {
    display: block;
    margin: 5px auto;
    width: 100%;
    height: 30px;
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
    &:hover {
      filter: brightness(90%) !important;
    }
    span {
      display: inline-block;
      margin-top: 5px;
      padding-right: 5px;
      color: white;
      font-size: 12px;
    }
  }
}
</style>
