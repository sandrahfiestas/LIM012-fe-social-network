/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
import { db } from '../main.js';

export const publishComment = (id, userName, newPost) => db.collection('posts').add({
  name: userName,
  post: newPost,
  user: id,
});

export const getAllPosts = (callback) => {
  const unsubscribe = db.collection('posts').onSnapshot((querySnapshot) => {
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ id: doc.id, ...doc.data() });
    });
    callback(allPosts);
  });
  return unsubscribe;
};

export const createProfileInfo = (id) => {
  db.collection('users').doc(id).set({
    aboutMe: 'Cuenta un poco sobre ti',
    location: 'Ciudad, País',
  });
};

export const getProfileInfo = userId => db.collection('users').doc(userId).get();

export const getPost = id => db.collection('posts').doc(id).get();

export const updateProfileInfo = (userId, description, place) => db.collection('users').doc(userId).update({
  aboutMe: description,
  location: place,
});

export const deletePost = id => db.collection('posts').doc(id).delete();

export const updatePost = (id, post) => db.collection('posts').doc(id).update({ post: post });

export const getUser = (docId) => {
  const docRef = firebase.firestore().collection('users').doc(docId);
  return docRef.get();
};
