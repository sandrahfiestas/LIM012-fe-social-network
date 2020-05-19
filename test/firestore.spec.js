import MockFirebase from 'mock-cloud-firestore';

import { publishPost, getAllPosts, deleteDoc } from '../src/firebase-controller/firestore-controller.js';

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
                  message: 'Comentando el post1',
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
                  message: 'Comentando el post2',
                  idPost: 'post0002',
                  time: '',
                  userId: '',
                },
                comment002: {
                  user: '02',
                  message: 'Otro comentando para el post2',
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
  it('Debería publicar un post', done => publishPost('03', 'Usuario Tres', 'Post tres', '', '', '', '', '').then(() => {
    const callback = (notes) => {
      const result = notes.find(element => element.post === 'Post tres');
      expect(result.post).toBe('Post tres');
      done();
    };
    getAllPosts(callback);
  }));
});

describe('deleteDoc', () => {
  it('Debería eliminar una nota con el id:post001', (done) => {
    deleteDoc('posts', 'post001')
      .then(() => {
        const callback = (notes) => {
          const result = notes.find(element => element.id === 'post001');
          expect(result).toBe(undefined);
          done();
        };
        getAllPosts(callback);
      });
  });
});
