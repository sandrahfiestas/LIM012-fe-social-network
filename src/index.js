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

// Definición de variables
/*
const btnRegistrar = document.getElementById('btnRegistrar');
const email = document.getElementById('email').value;
const contrasena = document.getElementById('contrasena').value;
const btnIngreso = document.getElementById('btnIngreso');
const email2 = document.getElementById('email').value;
const contrasena2 = document.getElementById('contrasena').value;
*/

// Registro de Usuarios (signIn)

const btnRegistrar = document.getElementById('btnRegistrar');
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

// Ingreso de usuarios

const btnIngreso = document.getElementById('btnIngreso');
btnIngreso.addEventListener('click', () => {
  const email2 = document.getElementById('email2').value;
  const contrasena2 = document.getElementById('contrasena2').value;

  firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
  .catch((error) => {
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
      console.log('Existe usuario activo');
      aparece();
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      // console.log(user);
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('No existe usuario activo');
      
      // ...
    }
  });
};
observador();

/*
const aparece = () => {
  const contenido = document.getElementById('contenido');
  contenido.innerHTML = `
  <p>Bienvenido</p>
  <button id="btnSignOff">Cerrar Sesión</button>
  `;
}

const btnSignOff = document.getElementById('btnSignOff');
btnSignOff.addEventListener('click', () => {
alert('si funciona');

  firebase.auth().signOut()

  .then(function(){
    console.log('Saliendo...');
  })
  .catch(function(error){
    console.log(error);
  });

});
*/
