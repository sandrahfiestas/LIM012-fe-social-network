/* eslint-disable import/no-cycle */
import { changeView } from './view-controller/router.js';
import { validation } from './validation-controller.js';

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
firebase.initializeApp(firebaseConfig);

// Iniciar Firestore
export const db = firebase.firestore();

// Obtiene una referencia al servicio de Storage
export const storage = firebase.storage();


const init = () => {
  validation(changeView);
};

window.addEventListener('load', init);
