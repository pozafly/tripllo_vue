import { hashtag } from '@/api';

/**
 * @typedef {Object} HashtagBoardInfo
 * @property {string} hashtagName - 해시태그 이름
 * @property {string} lastLikeCount - 무한 로딩에 필요한 마지막 좋아요 갯수(조회 조건에 필요 - 커서 기반 페이지네이션)
 * @property {string} lastCreatedAt - 무한 로딩에 필요한 마지막 생성날짜(조회 조건에 필요)
 */

/**
 * @typedef {Object} HashRanking
 * @property {number} count - 해시태그가 등록된 갯수
 * @property {number} name - 해시태그 이름
 */

/**
 * public section에서, 해시태그로 검색했을 시 해시태그를 가진 Board 목록을 조회
 * @param {HashtagBoardInfo} hashtagBoardInfo
 * @returns {Promise<Board[]>}
 */
const readBoardByHashtagAPI = ({ hashtagName, lastLikeCount, lastCreatedAt }) =>
  // hashtag.get('/', { hashtagName, lastLikeCount, lastCreatedAt });
  // 이게 안먹힌다 ㅜㅜ 왜지..
  hashtag.get(
    `/?hashtagName=${hashtagName}&lastLikeCount=${lastLikeCount}&lastCreatedAt=${lastCreatedAt}`,
  );

/**
 * public section에서, 해시태그 랭킹 표시
 * @returns {Promise<HashRanking[]>}
 */
const readRankingByLikeCountAPI = () => hashtag.get('/orderByCount');

export { readBoardByHashtagAPI, readRankingByLikeCountAPI };
