/* eslint-disable import/no-cycle */
import { storage } from '../main.js';


export const uploadImagePost = (file, uid) => {
  const refStorage = storage.ref(`imagePost/${uid}/${file.name}`);
  refStorage.put(file);
  // refStorage.put(file).then(snapshot =>{
  //   console.log(snapshot);
  // })
};

export const uploadPhotoProfile = (file, uid) => {
  const refStoragePhoto = storage.ref(`imagePhotoProfile/${uid}/${file.name}`);
  refStoragePhoto.put(file);
  // refStoragePhoto.put(file).then(result)
  // console.log(result);
  // refStoragePhoto.getDownloadURL().then(url => {})
};


export const downLoadPhoto = (file, uid) => {
  const refStoragePhoto = storage.ref(`imagePhotoProfile/${uid}/${file}`);
  return refStoragePhoto.getDownloadURL();
};
