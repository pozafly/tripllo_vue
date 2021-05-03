<template>
  <span @click="changePublic">
    {{ DisclosureDisplay }}
  </span>
</template>

<script>
import { updateBoardAPI } from '@/api/board';
import { mapActions } from 'vuex';

export default {
  props: {
    publicYn: {
      type: String,
      required: true,
      default: 'Y',
      validator(value) {
        return ['Y', 'N'].indexOf(value) !== -1;
      },
    },
    boardId: {
      type: Number,
      required: true,
      default: 0,
      validator(value) {
        return typeof value === 'number';
      },
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
    ...mapActions(['READ_BOARD_DETAIL']),

    async changePublic() {
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
      if (!change) {
        return;
      }
      try {
        await updateBoardAPI(this.boardId, { publicYn: status });
        await this.READ_BOARD_DETAIL(this.boardId);
      } catch (error) {
        console.log(error);
        alert('보드 공개여부를 업데이트 하지 못했습니다.');
      }
    },
  },
};
</script>
