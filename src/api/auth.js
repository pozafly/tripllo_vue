// 로그인 API
import { instance } from '@/api';

/**
 * @typedef {object} LoginData
 * @property {string} id - 로그인 아이디
 * @property {string} password - 로그인 비밀번호
 */

/**
 * @typedef {object} User
 * @property {string} bio - 소개
 * @property {string} email - 이메일
 * @property {string} id - 아이디
 * @property {number[]} invitedBoard - 초대된 Board
 * @property {string} name - 이름
 * @property {string} picture - 프로필 이미지 경로
 * @property {number[]} recentBoard - 최근 본 Board
 * @property {string} social - 소셜 계정 여부. 소셜 가입이 아닐 때는 null
 * @property {string} token - 로그인 token
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 * @property {string} updatedAt - 수정날짜
 * @property {string} updatedBy - 수정자
 */

/**
 * @typedef {object} SignupData
 * @property {string} id - 회원가입 아이디
 * @property {string} password - 회원가입 비밀번호
 * @property {string} email - 회원가입 이메일
 * @property {string} name - 회원가입 이름
 */

/**
 * id, pw를 이용해 로그인
 * @param {LoginData} loginData
 * @returns {Promise<User>} userData
 */
const loginUserAPI = loginData => instance.post('login', loginData);

/**
 * 소셜 로그인을 이용해 로그인
 * @param {string} userId
 * @returns {Promise<User>} userData
 */
const socialLoginAPI = userId => instance.get(`login/social/${userId}`);

/**
 * 로그아웃
 * @returns {Promise<string>} statusCode - 상태코드
 */
const logoutUserAPI = () => instance.get('logout');

/**
 * 회원가입
 * @param {SignupData} signupData - 회원가입 Data
 * @returns {Promise<boolean>} isSignup
 */
const signupAPI = signupData => instance.post('user', signupData);

/**
 * 회원가입 화면에서 회원ID가 사용되고 있는지 실시간 판별
 * @param {string} userId - 회원ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const validIdAPI = userId => instance.get(`user/valid/${userId}`);

export { loginUserAPI, socialLoginAPI, logoutUserAPI, signupAPI, validIdAPI };
