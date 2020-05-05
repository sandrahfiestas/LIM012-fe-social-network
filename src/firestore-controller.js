/* eslint-disable import/no-cycle */
import { db } from './main.js';

export const publishComment = (userName, newPost) => db.collection('posts').add({
  name: userName,
  post: newPost,
});

export const createProfileInfo = (cred) => {
  db.collection('users').doc(cred.user.uid).set({
    aboutMe: 'Cuenta un poco sobre ti',
    location: 'Ciudad, País',
  });
};

export const getProfileInfo = userId => db.collection('users').doc(userId).get();

export const updateProfileInfo = (userId, description, place) => db.collection('users').doc(userId).update({
  aboutMe: description,
  location: place,
});
