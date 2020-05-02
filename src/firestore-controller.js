/* eslint-disable import/no-cycle */
import { db } from './main.js';

export const publishComment = () => {
  const newPost = document.querySelector('#newPost').value;

  db.collection('posts').add({
    name: 'Alice Ramírez',
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
