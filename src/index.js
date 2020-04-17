import { example } from './example.js';
import firebase from 'firebase';

example();

const botonRegistrar = document.getElementById('boton');


botonRegistrar.addEventListener('click', () => {

  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;

  firebase.auth().createUserWithEmailAndPassword(email, contrasena).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});
