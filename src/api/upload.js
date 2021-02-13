import { upload } from '@/api';

const uploadApi = {
  readFile(cardId) {
    return upload.get(`/${cardId}`);
  },
  upload(formData) {
    return upload.post(`/`, formData);
  },
  uploadImage(imageData) {
    return upload.post('/image', imageData);
  },
  deleteFile(fileId) {
    return upload.delete(`/${fileId}`);
  },
};

export default uploadApi;
