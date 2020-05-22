/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signingIn, signingInGoogle } from '../view-controller/signin-controller.js';
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
  // Iniciando sesión con correo y contraseña
  const btnLogIn = viewSignIn.querySelector('#btnInitSession');
  btnLogIn.addEventListener('click', signingIn);
  // Cambiando a vista de registro
  const btnViewSignUp = viewSignIn.querySelector('#btnViewSignUp');
  btnViewSignUp.addEventListener('click', () => {
    changeView('#/signup');
  });
  // Iniciar sesión con Google
  const btnLogInGoogle = viewSignIn.querySelector('#btnLogInGoogle');
  btnLogInGoogle.addEventListener('click', signingInGoogle);

  return viewSignIn;
};
