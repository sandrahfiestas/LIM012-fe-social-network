import { changeView } from '../view-controller/router.js';
import { signUp } from '../firebase-controller.js';

export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.classList.add('signup');
    viewSignUp.innerHTML = `
    <img src="../src/img/logo.svg" alt="Voz Amiga">
    <div class="register-container">
        <div class="register-container register">
            <p class="text-purple">Regístrate</p>
            <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario">
            <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail">
            <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" 
            title="Tamaño mínimo de 6 caracteres">
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

            /*
             * verification();
             * 1. Avisar que se envió correo. 2. Ir a la vista iniciar sesión ?
             */
 
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


/* 
const btnNewAccount = document.querySelector('#btnNewAccount');
const nameUser = document.querySelector ('#nameUser');
const emailLogUp = document.querySelector('#emailSignUp');
const passwordLogUp = document.querySelector('#passwordSignUp');
const alerta = document.querySelector ('#alerta');

const allowText = (eventType, allowed) => {
  console.log(eventType,allowed);
  // 8=backSpace, 46=Supr, 37=flecha izquierda, 39=flecha derecha
  let characters = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let specialKeys = [8, 37, 39, 46];
  // Seleccionar los caracteres a partir del parametro de la función
  switch (allowed) {
    case 'car':
      allowed = characters;
      break;
  }
  // Tecla pulsada
  let evento = eventType || window.event;
  console.log(evento);
  let characterCode = evento.charCode || evento.keyCode;
  console.log(characterCode);
  let character = String.fromCharCode(characterCode);
  console.log(character);
  // Comprobar si la tecla pulsada es alguna de las teclas_especiales
 let specialKey = false;
 for(let i in specialKeys) {
   if(characterCode == specialKeys[i]) {
     specialKey = true;
     break;
   }
 }
 // Comprobar si la tecla pulsada es un caracter permitido o si es una tecla especial
 return allowed.indexOf(character) != -1 || specialKey;
}


btnNewAccount.addEventListener('click', () => {
  // Comprueba campos vacios
if (nameUser.value == "" || emailLogUp.value == "" || passwordLogUp.value =="") {
   nameUser.classList.add('invalid');
   emailLogUp.classList.add('invalid');
   passwordLogUp.classList.add('invalid');
   alerta.innerHTML = 'Campos vacios. Ingrese información';
   // return false;
}else{
  alert('Enviando formulario');
}

});

*/
