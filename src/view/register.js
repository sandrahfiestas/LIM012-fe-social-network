/* eslint-disable import/no-cycle */
import { signUp, verificationEmail } from '../firebase-controller.js';
import { changeView } from '../view-controller/router.js';

export default () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup');
  viewSignUp.innerHTML = `
    <img src="../src/img/logo.svg" alt="Voz Amiga" class="hide-show"> 
    <div class="register-container">
        <div class="register-container register">
            <p class="text-purple">Regístrate</p>
            <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario" minlength="3" maxlength="30" pattern="^[A-Za-z]{3,30}$">
            <div class="msgAlertReg ">
              <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail"  pattern="[A-Za-z0-9]+@[a-z]+\.[a-z]+">
              <span class="balloon ocult">Ingrese un e-mail valido</span>
            </div>
            <div class="msgAlertReg">
        
            <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" minlength="6" maxlength="30" pattern="[A-Za-z0-9]{6,30}$">
              <span class="balloon ocult">Tamaño mínimo de 6 caracteres</span>
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

  // const nameUser = viewSignUp.querySelector('#nameUser');
  // const emailLogUp2 = viewSignUp.querySelector('#emailSignUp');
  // const passwordLogUp2 = viewSignUp.querySelector('#passwordSignUp');
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');
  // const alertIconN = viewSignUp.querySelector('#alertIconN');
  // const alertIconE = viewSignUp.querySelector('#alertIconE');
  // const alertIconP = viewSignUp.querySelector('#alertIconP');



/*
  // Validación de formulario

  nameUser.addEventListener('input', () => {
    const patronName = /^[A-Za-z]+$/;
    const coincideName = patronName.test(nameUser.value);
    if (coincideName) {
      //alertIconN.classList.add('hide');
      nameUser.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero usuario');
    } else {
      //alertIconN.classList.remove('hide');
      //alertIconN.classList.add('iconInvalid');
      nameUser.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton usuario');
    }
  });

  emailLogUp2.addEventListener('input', () => {
    const patronEmail = /[A-Za-z0-9]+@[a-z]+\.[a-z]+/;
    const coincideEmail = patronEmail.test(emailLogUp2.value);
    if (coincideEmail) {
      // alertIconE.classList.add('hide');
      emailLogUp2.classList.remove('inputInvalid');
      // btnNewAccount.classList.remove('btn-locked');
      // console.log('verdadero email');
    } else {
      //alertIconE.classList.remove('hide');
      //alertIconE.classList.add('iconInvalid');
      emailLogUp2.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton email');
    }
  });

    const patronPassword = /[A-Za-z0-9]{6,20}$/;
    const coincidenciaPassword = patronPassword.test(passwordLogUp2.value);
    if (coincidenciaPassword ) {
      //alertIconP.classList.add('hide');
      passwordLogUp2.classList.remove('inputInvalid');
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      // console.log('verdadero password');
    } else {
      //alertIconP.classList.remove('hide');
      //alertIconP.classList.add('iconInvalid');
      passwordLogUp2.classList.add('inputInvalid');
      btnNewAccount.classList.add('btn-locked');
      // console.log('falso boton password');
    }
    */

const nameUser = viewSignUp.querySelector('#nameUser');
const emailLogUp2 = viewSignUp.querySelector('#emailSignUp');
const passwordLogUp2 = viewSignUp.querySelector('#passwordSignUp');


  nameUser.addEventListener('input', () => {  
    if (nameUser.value == "" || emailLogUp2.value == "" || passwordLogUp2.value == ""){
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('email o password vacios');
    }else if (nameUser.validity.valid && emailLogUp2.validity.valid && passwordLogUp2.validity.valid){
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      console.log('activar boton');
      console.log(nameUser.validity.valid);
    } else {
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('desactivar boton');
    }
  });

  emailLogUp2.addEventListener('input', () => {
    if (nameUser.value == "" || emailLogUp2.value == "" || passwordLogUp2.value == ""){
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('usuario o password vacios');
    } else if (nameUser.validity.valid && emailLogUp2.validity.valid && passwordLogUp2.validity.valid) {
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      console.log('activar boton');
      console.log(emailLogUp2.validity.valid);
    } else {
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('desactivar boton');
    }
  });

  passwordLogUp2.addEventListener('input', () => {
    if (nameUser.value == "" || emailLogUp2.value == "" || passwordLogUp2.value == ""){
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('usuario o password vacios');
    } else if (nameUser.validity.valid && emailLogUp2.validity.valid && passwordLogUp2.validity.valid) {
      btnNewAccount.classList.remove('btn-locked');
      btnNewAccount.disabled = false;
      console.log('activar boton');
      console.log(passwordLogUp2.validity.valid);
    } else {
      btnNewAccount.classList.add('btn-locked');
      btnNewAccount.disabled = true;
      console.log('desactivar boton');
    }
  });
  // Termina validación de formulario



  btnNewAccount.addEventListener('click', () => {
    const emailLogUp = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp').value;

    signUp(emailLogUp, passwordLogUp).then(() => {
      verificationEmail().then(() => {
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
