import { signUp, verification } from '../firebase-controller.js';
// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup');
  viewSignUp.innerHTML = `
    <img src="../img/logo.svg" alt="Voz Amiga" class="hide-show"> 
    <div class="register-container">
        <div class="register-container register">
            <p class="text-purple">Regístrate</p>
            <input class="input-register" id="nameUser" type="email" placeholder="Nombre de usuario">
            <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail">
            <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña">
            <button class="btn-new-account" id="btnNewAccount">Crear cuenta</button>
            <p class="text-init-app">o ingresa con</p>
        </div>
        <p class="text2">¿Ya tienes una cuenta?</p>
        <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
    </div>`;

  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');
  btnNewAccount.addEventListener('click', () => {
    const emailLogUp = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp').value;
    signUp(emailLogUp, passwordLogUp).then(() => {
      verification().then(() => {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Revisa tu correo electrónico para terminar el registro';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      });
    }).catch((error) => {
      console.log(error.message);
      // Mostrar el error en pantalla
    });
  });

  const btnViewLogIn = viewSignUp.querySelector('#btnViewLogIn');
  btnViewLogIn.addEventListener('click', () => {
    changeView('#/signin');
  });

  return viewSignUp;
};
