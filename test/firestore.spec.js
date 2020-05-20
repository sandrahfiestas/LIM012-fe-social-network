/* eslint-disable max-len */
/* eslint-disable import/named */
import MockFirebase from 'mock-cloud-firestore';

import {
  publishPost,
  getAllPosts,
  deleteDoc,
  updatePost,
  publishComment,
  getAllComments,
  // updateComment,
} from '../src/firebase-controller/firestore-controller.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post001: {
          name: 'Usuario Uno',
          post: 'Post uno',
          user: '01',
          photo: '',
          img: '',
          time: '',
          privacy: '',
          likes: '',
        },
        post002: {
          name: 'Usuario dos',
          post: 'Post dos',
          user: '02',
          photo: '',
          img: '',
          time: '',
          privacy: '',
          likes: '',
        },
      },
    },
    // comments: {
    //   __doc__: {
    //     comment001: {
    //       user: '02',
    //       message: 'Comentando el post2',
    //       idPost: 'post0002',
    //       time: '',
    //       userId: '',
    //     },
    //   },
    // },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('publishPost', () => {
  it('Deberia de poder agregar un post', done => publishPost('03', 'Usuario Tres', 'Post agregado', '', '', '', '', '')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.post === 'Post agregado');
        expect(result.post).toBe('Post agregado');
        done();
      };
      getAllPosts(callback);
    }));
});

describe('deleteDoc', () => {
  it('Deberia de poder eliminar un post con el id: post001', done => deleteDoc('posts', 'post001')
    .then(() => {
      const callback = (post) => {
        const result = post.find(element => element.id === 'post001');
        expect(result).toBe(undefined);
        done();
      };
      getAllPosts(callback);
    }));
});

describe('updatePost', () => {
  it('Deberia de poder actualizar el contenido de un post002', done => updatePost('post002', 'Actualizando post')
    .then(() => {
      const callback = (post) => {
        // console.log(post);
        const result = post.find(element => element.id === 'post002');
        expect(result.post).toBe('Actualizando post');
        done();
      };
      getAllPosts(callback);
    }));
});


describe('publishComment', () => {
  it('Deberia poder agregar un comentario al post002', done => publishComment('Usuario3', 'Agregando comentario al post2', 'post002', '', 'User003')
    .then(() => {
      const callback = (comment) => {
        const result = comment.find(element => element.comment === 'Agregando comentario al post2');
        expect(result.userId).toBe('User003');
        done();
      };
      getAllComments(callback, 'post002');
    }));
});


// describe('updateComment', () => {
//   it('Debería poder editar un comentario con el id: comment001',
//     done => updateComment('comment001', 'Actualizando comentario')
//       .then(() => {
//         const callback = (comments) => {
//           // console.log(comments);
//           const result = comments.find(element => element.id === 'comment001');
//           // console.log(result);
//           expect(result.comments).toBe('Actualizando comentario');
//           done();
//         };
//         getAllComments(callback, 'comment001');
//       }));
// });
