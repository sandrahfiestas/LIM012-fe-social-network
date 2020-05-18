/* eslint-disable object-shorthand */
/* eslint-disable import/no-cycle */
import { db } from '../main.js';

// Posts

export const publishPost = (id, userName, newPost, imagePost, time, status, userPhoto) => db.collection('posts').add({
  name: userName,
  post: newPost,
  user: id,
  photo: userPhoto,
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

// export const getPost = id => db.collection('posts').doc(id).get();

export const deletePost = id => db.collection('posts').doc(id).delete();

export const updatePost = (id, post) => db.collection('posts').doc(id).update({ post: post });

export const updatePrivacy = (id, status) => db.collection('posts').doc(id).update({ privacy: status });

// Comentarios
export const publishComment = (userName, comment, idPost, date, userId) => db.collection('comments').add({
  user: userName,
  comment: comment,
  idPost: idPost,
  time: date,
  userId: userId,
});

export const getAllComments = (callback, id) => db.collection('comments')
  .where('idPost', '==', id)
  .orderBy('time', 'asc')
  .onSnapshot((querySnapshot) => {
    const allComments = [];
    querySnapshot.forEach((doc) => {
      allComments.push({ id: doc.id, ...doc.data() });
    });
    callback(allComments);
  });

export const updateComment = (id, comment) => db.collection('comments').doc(id).update({ comment: comment });

export const deleteComment = id => db.collection('comments').doc(id).delete();

// Profile
export const createProfileInfo = (id) => {
  db.collection('users').doc(id).set({
    aboutMe: 'Cuenta un poco sobre ti',
    location: 'Ciudad, País',
  });
};

export const getProfileInfo = userId => db.collection('users').doc(userId).get();

export const updateProfileInfo = (userId, description, place) => db.collection('users').doc(userId).update({
  aboutMe: description,
  location: place,
});

// Likes
export const updateLike = (id, likes) => db.collection('posts').doc(id).update({ likes });

// User
export const getUser = (docId) => {
  const docRef = firebase.firestore().collection('users').doc(docId);
  return docRef.get();
};
