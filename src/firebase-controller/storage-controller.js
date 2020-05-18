/* eslint-disable import/no-cycle */
import { storage } from '../main.js';


export const uploadImagePost = (file, uid) => {
  const refStorage = storage.ref(`imagePost/${uid}/${file.name}`);
  refStorage.put(file);
};

export const uploadPhotoProfile = (file, uid) => {
  const refStoragePhoto = storage.ref(`imagePhotoProfile/${uid}/${file.name}`);
  return refStoragePhoto.put(file).then(snapshot => snapshot.ref.getDownloadURL());
};
