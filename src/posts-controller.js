/* eslint-disable import/no-cycle */
import { getAllPosts } from './firebase-controller/firestore-controller.js';


export const postsFilter = (currentUser) => {
  getAllPosts((notes) => {
    notes.forEach((element) => {
      if (element.user === currentUser.uid) {
        // Acá están los posts
        console.log(element);
      } else if (element.privacy === 0 || element.user === currentUser.uid) {
        console.log('no es mi post');
      }
    });
  });
};
