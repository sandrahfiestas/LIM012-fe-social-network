/* eslint-disable multiline-comment-style */
import { changeView } from './view-controller/router.js';
import { observer } from './firebase-controller.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRUpKAaeQ9e4ibo9Y4cT4D1HIenlA2yXM',
  authDomain: 'crear-usuario-66208.firebaseapp.com',
  databaseURL: 'https://crear-usuario-66208.firebaseio.com',
  projectId: 'crear-usuario-66208',
  storageBucket: 'crear-usuario-66208.appspot.com',
  messagingSenderId: '264882127288',
  appId: '1:264882127288:web:cc17210f5ad83a83ec0f4d',
  measurementId: 'G-VHBZKPRF3V',
};

// Initialize Firebase
window.firebase.initializeApp(firebaseConfig);

const init = () => {
  // Primero debería ver si hay un user loggeado o no
  window.location.hash = '#/signin';
  changeView(window.location.hash);
  observer();

  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);
