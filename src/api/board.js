import { board } from '@/api';

/**
 * @typedef {object} Board
 * @property {string} userId - Board의 주인ID
 * @property {number} id - Board의 ID
 * @property {string} title - Board의 제목
 * @property {string} bgColor - 배경색상
 * @property {string[]} invitedUser - 초대된 유저 목록
 * @property {string} publicYn - 공개여부
 * @property {number[]} hashtag - 해시태크
 * @property {number} likeCount - 좋아요 카운트
 * @property {number} ownLike - 로그인 한 유저가 해당 board에 좋아요를 표시했는지 여부
 * @property {string} createdAt - 생성자
 * @property {string} createdBy - 생성날짜
 * @property {string} updatedAt - 수정자
 * @property {string} updatedBy - 수정날짜
 */

/**
 * @typedef {object} BoardDetail
 * @property {List[]} lists - board가 가지고 있는 list 목록
 * @property {string} createdByPicture - 생성자 프로필 사진 경로
 * @property {number} id - Board의 ID
 * @property {string} title - Board의 제목
 * @property {string} bgColor - 배경색상
 * @property {string[]} invitedUser - 초대된 유저 목록
 * @property {string} publicYn - 공개여부
 * @property {number[]} hashtag - 해시태크
 * @property {number} likeCount - 좋아요 카운트
 * @property {number} ownLike - 로그인 한 유저가 해당 board에 좋아요를 표시했는지 여부
 * @property {string} createdAt - 생성자
 * @property {string} createdBy - 생성날짜
 */

/**
 * @typedef List
 * @property {Card[]} cards - list가 가지고 있는 card 목록
 * @property {number} boardId - list가 속해있는 Board의 ID
 * @property {number} id - list의 ID
 * @property {number} pos - Dragula에 사용되는 포지션 값
 * @property {string} title - list의 제목
 */

/**
 * @typedef {object} Card
 * @property {string} description - 메모(설명)
 * @property {string} dueDate - 날짜 체크 값
 * @property {number} id - card의 ID
 * @property {number} pos - Dragula에 사용되는 포지션 값
 * @property {string} title - card의 제목
 * @property {string} isAttachment - 첨부파일 여부
 * @property {string} isChecklist - 체크리스트 여부
 * @property {string[]} labelColor - 레이블 색상
 * @property {string} listId - card가 속해있는 list의 ID
 * @property {string} location - 장소 위치 값
 */

/**
 * @typedef {object} CreateBoardInfo
 * @property {string} title - 제목
 * @property {string} publicYn - 공개여부
 * @property {string[]} hashtag - 해시태그
 * @property {string} bgColor - 배경색상
 */

/**
 * @typedef {object} UpdateBoardInfo
 * @property {string} title - 제목
 * @property {string} publicYn - 공개여부
 * @property {string[]} hashtag - 해시태그
 * @property {string} bgColor - 배경색상
 * @property {string[]} invitedUser - 초대된 유저 ID 정보
 */

/**
 * 로그인 한 유저의 Board 목록을 조회(Order by createdAt)
 * @param {string} lastCreatedAt - 마지막 Board Item DOM의 생성날짜.
 * @returns {Promise<Board[]>}
 */
const readPersonalBoardAPI = lastCreatedAt =>
  board.get(`/personal/${lastCreatedAt}`);

/**
 * 특정 유저의 Board 목록 조회
 * @param {string} searchUserId - 특정 유저의 ID
 * @param {lastCreatedAt} searchUser - 마지막 Board Item DOM의 생성날짜.
 * @returns {Promise<Board[]>}
 */
const readSearchUserBoardAPI = (searchUserId, lastCreatedAt) =>
  // SpringBoot의 GetMapping에서 @PathVariable 때문에 payload(객체 전달) 불가
  board.get(`/${searchUserId}/${lastCreatedAt}`);

/**
 * 로그인 한 유저(personal)의 Board 보드 목록 재조회. recentBoard와의 sync를 맞추기 위해 필요하다.
 * @param {number} count - 현재 뿌려진 Personal Board 갯수
 * @returns {Promise<Board[]>}
 */
const readPersonalBoardLimitCountAPI = count => board.get(`/rerender/${count}`);

/**
 * 로그인 한 유저의 최근 본 Board 목록 조회.
 * @param {string} recentLists - 최근 본 Board 목록 id Array를 stringify함.
 * @returns {Promise<Board[]>}
 */
const readRecentBoardAPI = recentLists => board.get(`/recent/${recentLists}`);

/**
 * 로그인 한 유저의 초대된 Board 목록 조회.
 * @param {string} invitedLists - 초대된 Board 목록 id Array를 stringify함.
 * @returns {Promise<Board[]>}
 */
const readInvitedBoardAPI = invitedLists =>
  board.get(`/invited/${invitedLists}`);

/**
 * Board 상세 페이지의 데이터를 모두 가져온다.
 * @param {number} boardId - 선택한 Board item의 ID
 * @returns {Promise<BoardDetail[List[Card]]>}
 */
const readBoardDetailAPI = boardId => board.get(`detail/${boardId}`);

/**
 * Board 생성
 * @param {CreateBoardInfo} createBoardInfo - Board 생성 정보
 * @returns {Promise<Board>}
 */
const createBoardAPI = createBoardInfo => board.post('/', createBoardInfo);

/**
 * Board 수정
 * @param {UpdateBoardInfo} updateBoardInfo - Board 수정 정보
 * @returns {Promise<Board>}
 */
const updateBoardAPI = (id, updateBoardInfo) =>
  board.put(`/${id}`, updateBoardInfo);

/**
 * Board 삭제
 * @param {number} id - Board ID
 * @returns {Promise<string>} - boardId
 */
const deleteBoardAPI = id => board.delete(`/${id}`);

/**
 * 푸시 메세지를 승락할 시, 해당 Board의 정보를 조회
 * @param {number} boardId - 푸시메세지에 등록된 Board ID
 * @returns {Promise<Board>}
 */
const readBoardForAcceptMessageAPI = boardId => board.get(`/${boardId}`);

export {
  readPersonalBoardAPI,
  readSearchUserBoardAPI,
  readPersonalBoardLimitCountAPI,
  readRecentBoardAPI,
  readInvitedBoardAPI,
  readBoardDetailAPI,
  createBoardAPI,
  updateBoardAPI,
  deleteBoardAPI,
  readBoardForAcceptMessageAPI,
};
