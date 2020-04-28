import { signIn, validation, logInGoogle, logInFacebook} from '../firebase-controller.js';

// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
// const BASE_URL = 'http://127.0.0.1:5500/src';



export default () => {
  const viewSignIn = document.createElement('div');
  viewSignIn.classList.add('signin');
  viewSignIn.innerHTML = `
    <img src="../img/logo.svg" alt="Voz Amiga" class="logo-social-network">
    <p class="text">Bienvenida a la red social para mujeres</p>
    <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
    <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
    <button class="btn-initsession" id="btnInitSession">Iniciar sesión
      <span class="balloon ocult">El email o contraseña no son válidos</span>
    </button>
    <p class="text2">o ingresa con</p>
    <p class="text2">¿No tienes cuenta?</p>
    <button class="btn-signup" id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>
    <p>ó</p>
    <button id="btnLogInGoogle">Google SingIn</button>
    <button id="btnLogInFacebook">Facebook SingIn</button>
    `;

  const btnLogIn = viewSignIn.querySelector('#btnInitSession');
  btnLogIn.addEventListener('click', () => {
    const emailLogIn = viewSignIn.querySelector('#emailLogIn').value;
    const passwordLogIn = viewSignIn.querySelector('#passwordLogIn').value;
    const msgAlert = viewSignIn.querySelector('.balloon');

    signIn(emailLogIn, passwordLogIn).then(() => {
      validation(changeView);
    }).catch(() => {
      msgAlert.classList.remove('ocult');
      setTimeout(() => {
        msgAlert.classList.add('ocult');
      }, 3000);
    });
  });

  const btnViewSignUp = viewSignIn.querySelector('#btnViewSignUp');
  btnViewSignUp.addEventListener('click', () => {
    changeView('#/signup');
  });


// Iniciar sesión con Google
  const btnLogInGoogle = viewSignIn.querySelector('#btnLogInGoogle');
  btnLogInGoogle.addEventListener('click', () => {
    logInGoogle()
    .then((result) => {
    //  changeView('#/home')
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    let name = result.user.displayName;
    console.log(user);
    
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});


// Iniciar sesión con Facebook
  const btnLogInFacebook = viewSignIn.querySelector('#btnLogInFacebook');
  btnLogInFacebook.addEventListener('click', () => {
    logInFacebook()
    .then((result) => {
      changeView('#/home')
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

    return viewSignIn;
 };