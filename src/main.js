/* eslint-disable multiline-comment-style */
import {
  observer,
  signIn,
  signOut,
} from './firebase-controller.js';
import { changeView } from './view-controller/router.js';

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
  window.location.hash = '#/signin';
  changeView(window.location.hash);
  console.log(window.location.hash);
  observer();

  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
    // Primero debería ver si hay un user loggeado o no
    // Pero no funciona el observer cuando no hay user loggeado porque es null :(
    if (window.location.hash === '#/') {
      // Inicio de sesión
      const btnLogIn = document.getElementById('btnInitSession');
      btnLogIn.addEventListener('click', () => {
        const emailLogIn = document.getElementById('emailLogIn').value;
        const passwordLogIn = document.getElementById('passwordLogIn').value;
        signIn(emailLogIn, passwordLogIn);
      });
    } else if (window.location.hash === '#/home') {
      // Sesión iniciada
      const btnSignOut = document.getElementById('btnSignOut');
      console.log(btnSignOut);
      btnSignOut.addEventListener('click', () => {
        signOut();
      });
    }
  });
};

window.addEventListener('load', init);
