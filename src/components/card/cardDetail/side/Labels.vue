<template>
  <SideBase @close="$emit('close')" :xy="xy">
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
  props: ['xy'],
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
    Array.from(this.$el.querySelectorAll('.label-item')).forEach(el => {
      el.style.backgroundColor = el.dataset.value;
    });

    // 밑에서 join으로 만든 문자열을 받아와서 split으로 다시 array로 만든다.
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

      if (!this.colorArray.includes(colorValue)) {
        // 없다면 push해라
        this.colorArray.push(colorValue);
      } else {
        // 있다면 빼라
        this.colorArray.pop(colorValue);
      }
      // join을 사용하여 문자열로 만든다.
      const labelColor = this.colorArray.join(',');
      this.UPDATE_CARD({ id: this.card.id, labelColor });
    },
  },
  created() {
    console.log(this.card.labelColor);
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
