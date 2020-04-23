/* eslint-disable multiline-comment-style */
import { changeView } from './view-controller/router.js';
import { observer } from './firebase-controller.js';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiA9ghv2IrE2sXpqDw-DL2wUP9Tw4Bud8',
  authDomain: 'voz-amiga.firebaseapp.com',
  databaseURL: 'https://voz-amiga.firebaseio.com',
  projectId: 'voz-amiga',
  storageBucket: 'voz-amiga.appspot.com',
  messagingSenderId: '1080723145307',
  appId: '1:1080723145307:web:767dc97ae31aaf7998757e',
};
// Initialize Firebase
window.firebase.initializeApp(firebaseConfig);

const init = () => {
// Primero debería ver si hay un user loggeado o no
  window.location.hash = '#/signin';
  changeView(window.location.hash);
  observer();

  // window.addEventListener('hashchange', () => {
  //   changeView(window.location.hash);
  // });
};

window.addEventListener('load', init);
