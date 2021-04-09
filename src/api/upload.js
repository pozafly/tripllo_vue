import { upload } from '@/api';

const readFile = cardId => upload.get(`/${cardId}`);
const uploadFile = formData => upload.post(`/`, formData);
const uploadImage = imageData => upload.post('/image', imageData);
const deleteFile = fileId => upload.delete(`/${fileId}`);

export { readFile, uploadFile, uploadImage, deleteFile };
