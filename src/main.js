import { example } from './example.js';
import { changeView } from './view-controller/router.js';

example();

const init = () => {
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);

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
firebase.initializeApp(firebaseConfig);

// Registro

const btnRegistrar = document.getElementById('btnSignUp');

btnRegistrar.addEventListener('click', () => {
  const email = document.getElementById('emailSignUp').value;
  const contrasena = document.getElementById('passwordSignUp').value;

  firebase.auth().createUserWithEmailAndPassword(email, contrasena).then(() => {
    verificar();
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

// Inicio de sesión

const btnIniciarSesion = document.getElementById('btnLogIn');

btnIniciarSesion.addEventListener('click', () => {
  const email2 = document.getElementById('emailLogIn').value;
  const contrasena2 = document.getElementById('passwordLogIn').value;

  firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

// Observador

const observador = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      console.log('Existe usuario activo');
      aparece(user);
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      console.log(user);
      // ...
    } else {
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
};
observador();

const contenido = document.getElementById('contenido');

const aparece = (user) => {
  const userV = user;
  if (userV.emailVerified) {
    contenido.innerHTML = 'Bienvenido';
  } else {
    contenido.innerHTML = 'Verifica tu correo';
  }
};

// Botón Cerrar Sesión

const btnSC = document.getElementById('btnSC');
btnSC.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    console.log('Saliendo...');
  }).catch((error) => {
    console.log(error);
  });
  contenido.innerHTML = 'Regresa pronto';
});

const verificar = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    // Email sent.
    console.log('Enviando correo...');
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
};
