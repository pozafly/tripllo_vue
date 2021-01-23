import { upload } from '@/api';

const uploadApi = {
  upload(formData) {
    return upload.post('/', formData);
  },
  uploadImage(imageData) {
    return upload.post('/image', imageData);
  },
};

export default uploadApi;
