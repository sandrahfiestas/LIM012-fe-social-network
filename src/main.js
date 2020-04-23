/* eslint-disable multiline-comment-style */
import { changeView } from './view-controller/router.js';
import { validation } from './firebase-controller.js';

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
  // Colocando el mismo hash en window - revisar
  validation(changeView);
};

window.addEventListener('load', init);
