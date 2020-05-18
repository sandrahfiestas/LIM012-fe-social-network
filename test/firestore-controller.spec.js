import MockFirebase from 'mock-cloud-firestore';

import {
  publishPost,
  getAllPosts,
  deletePost,
  updatePost,
  publishComment,
  getAllComments,
} from '../src/firebase-controller/firestore-controller.js';

// import MockFirebase from '../_mocks_/firebase-mock.js';


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
          __collection__: {
            comments: {
              __doc__: {
                comment001: {
                  user: '01',
                  comment: 'Comentando el post1',
                  idPost: 'post0001',
                  time: '',
                  userId: '',
                },
              },
            },
          },
        },
        post002: {
          name: 'Usuario Dos',
          post: 'Post dos',
          user: '02',
          photo: '',
          img: '',
          time: '',
          privacy: '',
          likes: '',
          __collection__: {
            comments: {
              __doc__: {
                comment001: {
                  user: '02',
                  comment: 'Comentando el post2',
                  idPost: 'post0002',
                  time: '',
                  userId: '',
                },
              },
            },
          },
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('publishPost', () => {
  // id, userName, newPost, imagePost, time, status, userPhoto
  it('Deberia de poder agregar un post', done => publishPost('Usuario Tres', 'Post tres', '03', '', '', '', '', '')
    .then(() => {
      const callback = (post) => {
        // console.log(post);
        // objeto post, element
        const result = post.find(element => element.name === 'Post tres');
        expect(result.name).toBe('Post tres');
        done();
      };
      getAllPosts(callback);
    }));
});

describe('deletePost', () => {
  it('Deberia de poder eliminar un post con el id: post001', done => deletePost('post001')
    .then(() => {
      const callback = (post) => {
        // console.log(post);
        const result = post.find(element => element.id === 'post001');
        // console.log(result);
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
        // console.log(result);
        expect(result.post).toBe('Actualizando post');
        done();
      };
      getAllPosts(callback);
    }));
});


describe('publishComment', () => {
  it('Deberia poder agregar un comentario al post002', done => publishComment('Usuario3', 'Agregando comentario al post2', 'post002', '', 'User003')
    .then(() => {
      const callback = (publish) => {
        // console.log(publish);
        const result = publish.find(element => element.comment === 'Agregando comentario al post2');
        // console.log(result);
        expect(result.userId).toBe('User003');
        done();
      };
      getAllComments(callback, 'post002');
    }));
});

// user: userName,
// comment: comment,
// idPost: idPost,
// time: date,
// userId: userId,
