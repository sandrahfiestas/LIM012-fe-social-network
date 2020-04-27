/* eslint-disable import/no-cycle */
import { signIn, validation } from '../firebase-controller.js';
import { changeView } from '../view-controller/router.js';
// const BASE_URL = 'http://127.0.0.1:5500/src';

export default () => {
  const viewSignIn = document.createElement('div');
  viewSignIn.classList.add('signin');
  viewSignIn.innerHTML = `
  <img src="../src/img/logo.svg" alt="Voz Amiga" class="logo-social-network">
  <p class="text">Bienvenida a la red social para mujeres</p>
  <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
  <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
  <button class="btn-initsession" id="btnInitSession">Iniciar sesión
    <span class="balloon ocult">El email o contraseña no son válidos</span>
  </button>
  <p class="text2">o ingresa con</p>
  <p class="text2">¿No tienes cuenta?</p>
  <button class="btn-signup" id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>`;

  const btnLogIn = viewSignIn.querySelector('#btnInitSession');
  btnLogIn.addEventListener('click', () => {
    const emailLogIn = viewSignIn.querySelector('#emailLogIn').value;
    const passwordLogIn = viewSignIn.querySelector('#passwordLogIn').value;
    const msgAlert = viewSignIn.querySelector('.balloon');

    signIn(emailLogIn, passwordLogIn).then(() => {
      validation(changeView);
    }).catch(() => {
      // Mostrar el error en pantalla
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

  return viewSignIn;
};
