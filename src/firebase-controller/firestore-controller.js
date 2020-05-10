/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
import { db } from '../main.js';

export const publishComment = (id, userName, newPost, imagePost, time, status) => db.collection('posts').add({
  name: userName,
  post: newPost,
  user: id,
  img: imagePost,
  time: time,
  privacy: status,
  likes: [],
});

export const getAllPosts = callback => db.collection('posts')
  .orderBy('time', 'desc')
  .onSnapshot((querySnapshot) => {
    const allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push({ id: doc.id, ...doc.data() });
    });
    callback(allPosts);
  });

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

export const updatePrivacy = (id, status) => db.collection('posts').doc(id).update({ privacy: status });

// export const updateLike = (id, like) => db.collection('posts').doc(id).update({ });

// export const time = () => firebase.firestore.FieldValue.serverTimestamp();

export const getUser = (docId) => {
  const docRef = firebase.firestore().collection('users').doc(docId);
  return docRef.get();
};
