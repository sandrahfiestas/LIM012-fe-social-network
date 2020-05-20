/* eslint-disable import/no-cycle */
import {
  signOut, user, updatePhotoAuth, updateUserName,
} from '../firebase-controller/auth-controller.js';
import { getProfileInfo, updateProfileInfo } from '../firebase-controller/firestore-controller.js';
import { uploadPhotoProfile } from '../firebase-controller/storage-controller.js';

export const signingOut = () => {
  signOut();
};

export const editableInfo = () => {
  const aboutMe = document.querySelector('#description');
  const location = document.querySelector('#location');
  const inputName = document.querySelector('#inputName');
  const name = document.querySelector('#name');
  const btnCancel = document.querySelector('#btnCancel');
  const btnSave = document.querySelector('#btnSave');

  aboutMe.contentEditable = 'false';
  location.contentEditable = 'false';
  aboutMe.classList.remove('input-style');
  location.classList.remove('input-style');
  name.classList.remove('hide');
  inputName.classList.add('hide');
  btnSave.classList.add('hide');
  btnCancel.classList.add('hide');
};

export const gettingProfileInfo = () => {
  const aboutMe2 = document.querySelector('#description');
  const location2 = document.querySelector('#location');
  const inputName2 = document.querySelector('#inputName');
  const name2 = document.querySelector('#name');
  const selectProfile = document.querySelector('#selectProfile');
  inputName2.value = name2.textContent;
  getProfileInfo(user().uid).then((doc) => {
    aboutMe2.textContent = doc.data().aboutMe;
    location2.textContent = doc.data().location;
  });
  editableInfo();
  selectProfile.classList.add('hide');
};

export const savingChanges = (file) => {
  const selectProfile2 = document.querySelector('#selectProfile');
  const aboutMe3 = document.querySelector('#description');
  const location3 = document.querySelector('#location');
  const inputName3 = document.querySelector('#inputName');
  const name3 = document.querySelector('#name');
  if (file) {
    uploadPhotoProfile(file, user().uid).then((url) => {
      updatePhotoAuth(url);
    });
  }
  editableInfo();
  updateProfileInfo(user().uid, aboutMe3.textContent, location3.textContent);
  name3.textContent = inputName3.value;
  localStorage.setItem('aboutMe', aboutMe3.textContent);
  localStorage.setItem('location', location3.textContent);
  selectProfile2.classList.add('hide');
  updateUserName(inputName3.value);
};
