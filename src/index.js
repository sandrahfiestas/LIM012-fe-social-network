import { example } from './example.js';

example();

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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const btnRegistrar = document.getElementById('btnRegistrar');


// Registro de Usuarios (signIn)
btnRegistrar.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  

  firebase.auth().createUserWithEmailAndPassword(email, contrasena)
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});
