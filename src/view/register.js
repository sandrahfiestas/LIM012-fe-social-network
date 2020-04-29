/* eslint-disable import/no-cycle */
import { signUp, verificationEmail, user } from '../firebase-controller.js';
import { changeView } from '../view-controller/router.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup');
  viewSignUp.innerHTML = `
    <img src="../src/img/logo.svg" alt="Voz Amiga" class="hide-show logo-register"> 
    <div class="register-container">
      <div class="register-container register">
        <p class="text-purple">Regístrate</p>
        <div class="msgAlertReg">
          <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario">
          <span class="balloon-2 ocult">Solo letras</span>
        </div>
        <div class="msgAlertReg">
          <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail">
          <span class="balloon-2 ocult">Ingrese un e-mail valido</span>
        </div>
        <div class="msgAlertReg">
          <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" maxlength= "20">
          <span class="balloon-2 ocult">Tamaño mínimo de 6 caracteres</span>
        </div>
        <button class="btn-new-account btn-locked" id="btnNewAccount" disabled=true>Crear cuenta</button>
        <p class="text-init-app">o ingresa con</p>
        <div class="container-social-network">
          <button class="btnSocialNetwork googleRegister" id="btnLogInGoogle"></button>
          <button class="btnSocialNetwork facebookRegister" id="btnLogInFacebook"></button>
        </div>
      </div>
      <p class="text2">¿Ya tienes una cuenta?</p>
      <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
    </div>`;

  const nameUser = viewSignUp.querySelector('#nameUser');
  const emailLogUp2 = viewSignUp.querySelector('#emailSignUp');
  const passwordLogUp2 = viewSignUp.querySelector('#passwordSignUp');
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');

  // Validación de formulario

  nameUser.addEventListener('input', () => {
    const patronName = /^[A-Za-z]+$/;
    const coincideName = patronName.test(nameUser.value);
    if (coincideName) {
      nameUser.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero usuario');
    } else {
      nameUser.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton usuario');
    }
  });

  emailLogUp2.addEventListener('input', () => {
    const patronEmail = /[A-Za-z0-9]+@[a-z]+\.[a-z]+/;
    const coincideEmail = patronEmail.test(emailLogUp2.value);
    if (coincideEmail) {
      emailLogUp2.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero email');
    } else {
      emailLogUp2.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton email');
    }
  });

  passwordLogUp2.addEventListener('input', () => {
    const patronPassword = /[A-Za-z0-9]{6,20}$/;
    const coincidenciaPassword = patronPassword.test(passwordLogUp2.value);
    if (coincidenciaPassword) {
      passwordLogUp2.classList.remove('inputInvalid');
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      // console.log('verdadero password');
    } else {
      passwordLogUp2.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton password');
    }
  });

  // Termina validación de formulario

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

  return viewSignUp;
};
