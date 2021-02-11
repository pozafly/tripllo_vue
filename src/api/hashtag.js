import { hashtag } from '@/api';

const hashtagApi = {
  readBoardByHashtag({ hashtagName, lastLikeCount, lastCreatedAt }) {
    return hashtag.get(
      `/?hashtagName=${hashtagName}&lastLikeCount=${lastLikeCount}&lastCreatedAt=${lastCreatedAt}`,
    );
  },

  readOrderByCount() {
    return hashtag.get('/orderByCount');
  },
};

export default hashtagApi;
