import { hashtag } from '@/api';

const hashtagApi = {
  readBoardByHashtag(hashtagName) {
    return hashtag.get(`/${hashtagName}`);
  },
};

export default hashtagApi;
