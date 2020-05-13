/* eslint-disable import/no-cycle */
import {
  signIn, logInGoogle,
} from '../firebase-controller/auth-controller.js';
import { validation } from '../firebase-controller/validation-controller.js';
import { createProfileInfo, getUser } from '../firebase-controller/firestore-controller.js';

// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
// const BASE_URL = 'http://127.0.0.1:5500/src';

export default () => {
  const viewSignIn = document.createElement('div');
  viewSignIn.classList.add('sign-in');
  viewSignIn.innerHTML = `
    <div class="signin-container">
      <img src="./img/logo.svg" alt="Voz Amiga" class="logo-social-network">
      <p class="text">Bienvenida a la red social para mujeres</p>
      <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
      <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
      <button class="btn-initsession" id="btnInitSession">Iniciar sesión
        <span class="balloon ocult">El email o contraseña no son válidos</span>
      </button>
      <div class="btn-google" id="btnLogInGoogle">
        <div class="logo-google google-sign-in"></div>
        <p class="text-3">Ingresa sesión con Google</p>
      </div>
      <p class="text-4">¿No tienes cuenta?</p>
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
    logInGoogle().then((result) => {
      getUser(result.user.uid).then((doc) => {
        if (!doc.exists) {
          createProfileInfo(result.user.uid);
        }
      });
    });
  });

  // Iniciar sesión con Facebook
  // Agregar como template string
  // <button class="btnSocialNetwork facebookSignIn" id="btnLogInFacebook"></button>
  // const btnLogInFacebook = viewSignIn.querySelector('#btnLogInFacebook');
  // btnLogInFacebook.addEventListener('click', logInFacebook);

  return viewSignIn;
};
