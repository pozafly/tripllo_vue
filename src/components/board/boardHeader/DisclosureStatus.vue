<template>
  <span @click="changePublic">
    {{ DisclosureDisplay }}
  </span>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    publicYn: {
      type: String,
      require: true,
      default: 'Y',
    },
    boardId: {
      type: Number,
      require: true,
      default: 0,
    },
  },

  computed: {
    DisclosureDisplay() {
      if (this.publicYn === 'Y') {
        return 'Public';
      } else {
        return 'Private';
      }
    },
  },

  methods: {
    ...mapActions(['UPDATE_BOARD']),

    changePublic() {
      let status;
      let sentense;

      if (this.publicYn === 'Y') {
        status = 'N';
        sentense =
          '공개여부를 Private으로 바꾸시면 초대된 사람은 유지되지만 \n해시태그를 통한 노출이 불가능 합니다. 그래도 바꾸시겠습니까?';
      } else {
        status = 'Y';
        sentense =
          '공개여부를 Public으로 바꾸시면 해시태그를 통해 노출이 가능합니다.';
      }

      let change = window.confirm(sentense);
      if (change) {
        this.UPDATE_BOARD({ id: this.boardId, publicYn: status });
      }
    },
  },
};
</script>
