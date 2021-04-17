import { upload } from '@/api';

/**
 * @typedef {object} File
 * @property {string} id - file ID
 * @property {string} extension - 확장자 명
 * @property {string} fileName - file 명
 * @property {string} link - 파일 다운로드 경로
 * @property {number} cardId - file이 어느 card에 속해있는지 구분
 * @property {string} createdAt - 생성날짜
 * @property {string} createdBy - 생성자
 */

/**
 * 파일 목록 조회
 * @param {number} cardId - card ID
 * @returns {Promise<File[]>}
 */
const readFileAPI = cardId => upload.get(`/${cardId}`);

/**
 * 파일 업로드
 * @param {multipart} formData - 파일
 * @returns {Promise<string>} statusCode - 상태코드
 */
const uploadFileAPI = formData => upload.post(`/`, formData);

/**
 * 프로필 사진 업로드
 * @param {multipart} imageData - 파일/이미지
 * @returns {Promise<string>} statusCode - 상태코드
 */
const uploadImageAPI = imageData => upload.post('/image', imageData);

/**
 * 파일 삭제
 * @param {number} fileId - 파일 ID
 * @returns {Promise<string>} statusCode - 상태코드
 */
const deleteFileAPI = fileId => upload.delete(`/${fileId}`);

export { readFileAPI, uploadFileAPI, uploadImageAPI, deleteFileAPI };
