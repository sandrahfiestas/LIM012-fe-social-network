import MockFirebase from 'mock-cloud-firestore';

import { publishPost } from '../src/firebase-controller/firestore-controller.js';

// import MockFirebase from '../_mocks_/firebase-mock.js';


const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post001: {
          post: 'Publicacion uno',
        },
        post002: {
          post: 'Publicacion dos',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('publishPost', () => {
  it('Deberia poder agregar un post', () => publishPost('Publicacion tres')
    .then((data) => {
      // console.log(data);
      expect(data).tobe('El post fue agregado');
    }));
});
