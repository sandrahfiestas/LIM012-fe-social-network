/* eslint-disable import/no-cycle */
import { storage } from '../main.js';


export const uploadImagePost = (file, uid) => {
  const refStorage = storage.ref(`imagePost/${uid}/${file.name}`);
  refStorage.put(file);
};

export const uploadPhotoProfile = (file, uid) => {
  const refStoragePhoto = storage.ref(`imagePhotoProfile/${uid}/${file.name}`);
  refStoragePhoto.put(file);
  return refStoragePhoto.getDownloadURL();
};
// export const downLoadPhoto = (file, uid) => {
//   const refStoragePhoto = storage.ref(`imagePhotoProfile/${uid}/${file}`);
//   return refStoragePhoto.getDownloadURL();
// };
