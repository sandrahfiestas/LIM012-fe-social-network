/* eslint-disable import/no-cycle */
import {
  signUp, verificationEmail, user, logInGoogle,
} from '../firebase-controller.js';
import { changeView } from '../view-controller/router.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup');
  viewSignUp.innerHTML = `
  <img src="./img/logo.svg" alt="Voz Amiga" class="hide-show logo-register"> 
  <div class="register-container">
    <div class="register-container register">
      <p class="text-purple">Regístrate</p>
      <div class="msgAlertReg">
      <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario"  pattern="([a-zA-Z]{2,30}\\s*)+">
        <span class="balloon-2 ocult">Solo letras</span>
      </div>
      <div class="msgAlertReg">
      <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail" pattern="[A-Za-z0-9]+@[a-z]+\\.[a-z]+">
        <span class="balloon-2 ocult">Ingrese un e-mail valido</span>
      </div>
      <div class="msgAlertReg">
      <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" minlength="6" maxlength="30" pattern="[A-Za-z0-9]{6,30}$">
        <span class="balloon-2 ocult">Tamaño mínimo de 6 caracteres</span>
      </div>
      <button class="btn-new-account btn-locked" id="btnNewAccount" disabled=true>Crear cuenta</button>
      <div class="btn-google btn-google-size" id="btnLogInGoogle">
        <div class="logoGoogle googleRegister"></div>
        <p class="text3">Ingresa sesión con Google</p>
      </div>
    </div>
    <p class="text2">¿Ya tienes una cuenta?</p>
    <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
  </div>`;

  const nameUser = viewSignUp.querySelector('#nameUser');
  const emailLogUp2 = viewSignUp.querySelector('#emailSignUp');
  const passwordLogUp2 = viewSignUp.querySelector('#passwordSignUp');
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');

  // Inicia validación de registro
  const signUpValidInputs = () => {
    if (nameUser.value === '' || emailLogUp2.value === '' || passwordLogUp2.value === '') {
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
    } else if (nameUser.validity.valid && emailLogUp2.validity.valid
      && passwordLogUp2.validity.valid) {
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
    } else {
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
    }
  };

  nameUser.addEventListener('input', signUpValidInputs);
  emailLogUp2.addEventListener('input', signUpValidInputs);
  passwordLogUp2.addEventListener('input', signUpValidInputs);
  // Termina validación de registro

  btnNewAccount.addEventListener('click', () => {
    const emailLogUp = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp').value;

    signUp(emailLogUp, passwordLogUp).then(() => {
      verificationEmail().then(() => {
        // Guardando nombre de usuario en la base de datos
        const userData = user();
        userData.updateProfile({
          displayName: nameUser.value,
        });

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
  btnLogInGoogle.addEventListener('click', logInGoogle);

  return viewSignUp;
};

// Template string del botón de Facebook
// <button class="btnSocialNetwork facebookRegister" id="btnLogInFacebook"></button>
