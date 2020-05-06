import { storage } from '../main.js';

export const uploadImagePost = (file, uid) => {
  const refStorage = storage.ref(`imagePost/${uid}/${file.name}`);
  refStorage.put(file);
};
