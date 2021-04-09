import { board } from '@/api';

/**
 * @typedef Board
 * @property {string} userId - Board의 주인ID
 * @property {string} createdAt - 생성자
 * @property {string} createdBy - 생성날짜
 * @property {string} updatedAt - 수정자
 * @property {string} updatedBy - 수정날짜
 * @property {number} id - Board의 ID
 * @property {string} title - Board의 제목
 * @property {string} bgColor - 배경색상
 * @property {Array<string>} invitedUser - 초대된 유저 목록
 * @property {string} publicYn - 공개여부
 * @property {Array<number>} hashtag - 해시태크
 * @property {number} likeCount - 좋아요 카운트
 * @property {number} ownLike - 로그인 한 유저가 해당 board에 좋아요를 표시했는지 여부
 */

/**
 * 로그인 한 유저의 Board 목록을 조회(Order by createdAt)
 * @param {string} lastCreatedAt - 마지막 Board Item DOM의 생성날짜.
 * @returns {Promise<Array<Board>>}
 */
const readPersonalBoard = lastCreatedAt =>
  board.get(`/personal/${lastCreatedAt}`);

/**
 * 특정 유저의 Board 목록 조회
 * @param {string} searchUserId - 특정 유저의 ID
 * @param {lastCreatedAt} searchUser - 마지막 Board Item DOM의 생성날짜.
 * @returns {Promise<Array<Board>>}
 */
const readSearchUserBoard = (searchUserId, lastCreatedAt) =>
  board.get(`/${searchUserId}/${lastCreatedAt}`);

/**
 * 로그인 한 유저(personal)의 Board 보드 목록 재조회. recentBoard와의 sync를 맞추기 위해 필요하다.
 * @param {number} count - 현재 뿌려진 Personal Board 갯수
 * @returns {Promise<Array<Board>>}
 */
const readPersonalBoardLimitCount = count => board.get(`/rerender/${count}`);

/**
 * 로그인 한 유저의 최근 본 Board 목록 조회.
 * @param {string} recentLists - 최근 본 Board 목록 id Array를 stringify함.
 * @returns {Promise<Array<Board>>}
 */
const readRecentBoard = recentLists => board.get(`/recent/${recentLists}`);

/**
 * 로그인 한 유저의 초대된 Board 목록 조회.
 * @param {string} invitedLists - 초대된 Board 목록 id Array를 stringify함.
 * @returns {Promise<Array<Board>>}
 */
const readInvitedBoard = invitedLists => board.get(`/invited/${invitedLists}`);

const readBoardDetail = boardId => board.get(`detail/${boardId}`);

const createBoard = ({ title, publicYn, hashtag, bgColor }) =>
  board.post('/', { title, publicYn, hashtag, bgColor });

const updateBoard = (id, { title, bgColor, invitedUser, hashtag, publicYn }) =>
  board.put(`/${id}`, {
    title,
    bgColor,
    invitedUser,
    hashtag,
    publicYn,
  });

const deleteBoard = id => board.delete(`/${id}`);

/**
 * 푸시 메세지를 승락할 시, 해당 Board의 정보를 가져옴
 * @param {number} boardId - 푸시메세지에 등록된 Board ID
 * @returns {Promise<Board>}
 */
const readBoardForAcceptMessage = boardId => board.get(`/${boardId}`);

export {
  readPersonalBoard,
  readSearchUserBoard,
  readPersonalBoardLimitCount,
  readRecentBoard,
  readInvitedBoard,
  readBoardDetail,
  createBoard,
  updateBoard,
  deleteBoard,
  readBoardForAcceptMessage,
};
