/* eslint-disable import/no-cycle */
import {
  signUp, verificationEmail, user, logInGoogle, updateUserName,
} from '../firebase-controller/auth-controller.js';
import { changeView } from '../view-controller/router.js';
import { createProfileInfo, getUser } from '../firebase-controller/firestore-controller.js';
import { signUpValidInputs } from '../view-controller/register-controller.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('sign-up');
  viewSignUp.innerHTML = `
  <img src="./img/logo.svg" alt="Voz Amiga" class="hide-show logo-register"> 
  <div class="register-container">
    <div class="register-container register">
      <p class="text-purple">Regístrate</p>
      <div class="msg-alert-reg">
      <input class="input-register validity" id="nameUser" type="text" placeholder="Nombre de usuario"  pattern="([a-zA-ZÁÉÍÓÚñáéíóúÑ]{1,30}\\s*)+">
        <span class="balloon-2 ocult">Solo letras</span>
      </div>
      <div class="msg-alert-reg">
      <input class="input-register validity" id="emailSignUp" type="email" placeholder="e-mail" pattern="[A-Za-z0-9]+@[a-z]+\\.[a-z]+">
        <span class="balloon-2 ocult">Ingrese un e-mail valido</span>
      </div>
      <div class="msg-alert-reg">
      <input class="input-register validity" id="passwordSignUp" type="password" placeholder="contraseña" minlength="6" maxlength="30" pattern="[A-Za-z0-9]{6,30}$">
        <span class="balloon-2 ocult">Tamaño mínimo de 6 caracteres</span>
      </div>
      <button class="btn-new-account btn-locked" id="btnNewAccount" disabled=true>Crear cuenta</button>
      <div class="btn-google btn-google-size" id="btnLogInGoogle">
        <div class="logo-google googleRegister"></div>
        <p class="text-3">Ingresa sesión con Google</p>
      </div>
    </div>
    <p class="text-2">¿Ya tienes una cuenta?</p>
    <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
  </div>`;

  const nameUser = viewSignUp.querySelector('#nameUser');
  const emailLogUp2 = viewSignUp.querySelector('#emailSignUp');
  const passwordLogUp2 = viewSignUp.querySelector('#passwordSignUp');
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');

  nameUser.addEventListener('input', signUpValidInputs);
  emailLogUp2.addEventListener('input', signUpValidInputs);
  passwordLogUp2.addEventListener('input', signUpValidInputs);
  // Termina validación de registro
  btnNewAccount.addEventListener('click', () => {
    const emailLogUp = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp').value;

    signUp(emailLogUp, passwordLogUp).then((result) => {
      createProfileInfo(result.user.uid);
      verificationEmail().then(() => {
        // Guardando nombre de usuario en la base de datos
        const userData = user();
        updateUserName(userData, nameUser.value);

        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Revisa tu correo electrónico para terminar el registro';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      });
    });
  });

  const btnViewLogIn = viewSignUp.querySelector('#btnViewLogIn');
  btnViewLogIn.addEventListener('click', () => {
    changeView('#/signin');
  });

  // Iniciar sesión con Google
  const btnLogInGoogle = viewSignUp.querySelector('#btnLogInGoogle');
  btnLogInGoogle.addEventListener('click', () => {
    logInGoogle().then((result) => {
      getUser(result.user.uid).then((doc) => {
        if (!doc.exists) {
          createProfileInfo(result.user.uid);
        }
      });
    });
  });

  return viewSignUp;
};

// Template string del botón de Facebook
// <button class="btnSocialNetwork facebookRegister" id="btnLogInFacebook"></button>
