import { email } from '@/api';

/**
 * @typedef {object} Email
 * @property {string} userId - 이메일을 보낼 대상 ID
 * @property {string} userEmail - 이메일 주소
 */

/**
 * 비밀번호를 바꾸기 위해 Email 전송
 * @param {Email} emailInfo
 * @returns {Promise<string>} statusCode - 상태코드(성공여부)
 */
const sendEmailAPI = emailInfo => email.post(`/`, emailInfo);

export { sendEmailAPI };
