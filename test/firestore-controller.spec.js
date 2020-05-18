import MockFirebase from 'mock-cloud-firestore';
import { publishPost, getAllPosts, deletePost } from '../src/firebase-controller/firestore-controller';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        idPost1: {
          name: 'Alice Ramírez',
          post: 'Hola',
          user: 'jMa7gr0fhGbErK1yPdjcP4xvtnH3',
          photo: 'https://firebasestorage.googleapis.com/v0/b/voz-amiga.appspot.com/o/imagePhotoProfile%2FjMa7gr0fhGbErK1yPdjcP4xvtnH3%2F75339672_10219975275635294_3560443728499834880_o.jpg?alt=media&token=fc9f90b7-1d80-4228-9ce7-e97fb88159b9',
          img: '',
          time: '17/5/2020 22:37:30',
          privacy: '0',
          likes: [],
        },

        idPost2: {
          name: 'Mariela Benitez',
          post: 'Ya sale mi foto de perfil',
          user: '5HL0M8YKp8VQbJ7ot8yzdiIbk9m2',
          photo: 'https://firebasestorage.googleapis.com/v0/b/voz-amiga.appspot.com/o/imagePhotoProfile%2F5HL0M8YKp8VQbJ7ot8yzdiIbk9m2%2FIMG_20190707_150320%20(2).jpg?alt=media&token=25165add-13c1-4ee5-849d-98ac1de79c96',
          img: '',
          time: '13/5/2020 15:26:27',
          privacy: '0',
          likes: [],
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

const obj = {
  name: 'Sandra Huaman',
  post: 'Probando un nuevo post',
  user: 'IOda6gQS5wZUlhGZJViqdST8npM2',
  photo: 'https://firebasestorage.googleapis.com/v0/b/voz-amiga.appspot.com/o/imagePhotoProfile%2FjMa7gr0fhGbErK1yPdjcP4xvtnH3%2F75339672_10219975275635294_3560443728499834880_o.jpg?alt=media&token=fc9f90b7-1d80-4228-9ce7-e97fb88159b9',
  img: '',
  time: '13/5/2020 17:04:09',
  privacy: '0',
  likes: [],
};

describe('publishPost', () => {
  it('User can publish a post', done => publishPost(obj.user, obj.name, obj.post, obj.img, obj.time, obj.privacy, obj.photo).then(() => {
    const callback = (allPosts) => {
      const result = allPosts.find(element => element.post === 'Probando un nuevo post');
      expect(result.name).toBe('Sandra Huaman');
      done();
    };
    getAllPosts(callback);
  }));
});

describe('deleteNote', () => {
  it('User can delete a post with id: abc123', done => deletePost('abc123').then(() => {
    const callback = (allPosts) => {
      const result = allPosts.find(element => element.id === 'abc123');
      expect(result).toBe(undefined);
      done();
    };
    getAllPosts(callback);
  }));
});
