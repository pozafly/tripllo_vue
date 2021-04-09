import { hashtag } from '@/api';

const readBoardByHashtag = ({ hashtagName, lastLikeCount, lastCreatedAt }) =>
  hashtag.get(
    `/?hashtagName=${hashtagName}&lastLikeCount=${lastLikeCount}&lastCreatedAt=${lastCreatedAt}`,
  );

const readRankingByLikeCount = () => hashtag.get('/orderByCount');

export { readBoardByHashtag, readRankingByLikeCount };
