import MockFirebase from 'mock-cloud-firestore';

import { publishPost, getAllPosts, deletePost } from '../src/firebase-controller/firestore-controller.js';

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
