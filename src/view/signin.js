import {
  signIn,
  validation,
  logInGoogle,
  logInFacebook,
} from '../firebase-controller.js';

// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
// const BASE_URL = 'http://127.0.0.1:5500/src';

export default () => {
  const viewSignIn = document.createElement('div');
  viewSignIn.classList.add('signin');
  viewSignIn.innerHTML = `
    <div class="signin-container">
      <img src="../img/logo.svg" alt="Voz Amiga" class="logo-social-network">
      <p class="text">Bienvenida a la red social para mujeres</p>
      <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
      <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
      <button class="btn-initsession" id="btnInitSession">Iniciar sesión
        <span class="balloon ocult">El email o contraseña no son válidos</span>
      </button>
      <p class="text2">o ingresa con</p>
      <div class="container-social-network">
        <button class="btnSocialNetwork googleSignIn" id="btnLogInGoogle"></button>
        <button class="btnSocialNetwork facebookSignIn" id="btnLogInFacebook"></button>
      </div>
      <p class="text2">¿No tienes cuenta?</p>
      <button class="btn-signup" id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>
    </div>
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
    logInGoogle().then(() => {
    //  changeView('#/home')
    // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
    // ...
    }).catch(() => {
    // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
    // ...
    });
  });


  // Iniciar sesión con Facebook
  const btnLogInFacebook = viewSignIn.querySelector('#btnLogInFacebook');
  btnLogInFacebook.addEventListener('click', () => {
    logInFacebook().then(() => {
      changeView('#/home');
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // ...
    }).catch(() => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;
      // ...
    });
  });

  return viewSignIn;
};
