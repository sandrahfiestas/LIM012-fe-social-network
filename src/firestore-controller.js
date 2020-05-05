/* eslint-disable import/no-cycle */
import { db, storage} from './main.js';

export const publishComment = (userName) => {
  const newPost = document.querySelector('#newPost').value;
  db.collection('posts').add({
    name: userName,
    post: newPost,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('newPost').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

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
