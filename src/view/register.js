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

            <input class="input-register" id="nameUser" type="text" placeholder="Nombre de usuario">
            <div class="msgAlertReg">
            <input class="input-register" id="emailSignUp" type="email" placeholder="e-mail">
            <span class="balloon ocult">Ingrese un e-mail valido</span>
            </div>
            <div class="msgAlertReg">
            <input class="input-register" id="passwordSignUp" type="password" placeholder="contraseña" minlength= "6" maxlength= "15">
            <span class="balloon ocult">Tamaño mínimo de 6 caracteres</span>
            </div>
            <button class="btn-new-account btn-locked" id="btnNewAccount" disabled= true>Crear cuenta</button>

            <p class="text-init-app">o ingresa con</p>
        </div>
        <p class="text2">¿Ya tienes una cuenta?</p>
        <a class="text-init-session" id="btnViewLogIn" href="#/signin">Inicia sesión</a>
    </div>`;
    

    const nameUserUp = viewSignUp.querySelector('#nameUserSingUp');
    const emailLogUp = viewSignUp.querySelector('#emailSignUp');
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp');
    const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');




    passwordLogUp.addEventListener('input', () => {
      if (passwordLogUp.value.length > 5) {
        btnNewAccount.classList.remove('btn-locked')
      } else {
        btnNewAccount.classList.add('btn-locked')
      }
    });


    /*
  const btnNewAccount = viewSignUp.querySelector('#btnNewAccount');
  btnNewAccount.addEventListener('click', () => {
    const emailLogUp = viewSignUp.querySelector('#emailSignUp').value;
    const passwordLogUp = viewSignUp.querySelector('#passwordSignUp').value;
    
   // Validación
      const nameUser = viewSignUp.querySelector('#nameUser').value;
      const patronName = /[A-Za-z]/;
      const patronEmail = /[A-Za-z]+@[a-z]+\.[a-z]+/ ;

      let coincideEmail = patronEmail.test(emailLogUp);
      let coincideName = patronName.test(nameUser);
      if (coincideEmail) {
        console.log('e- mail VALIDO');
      } if (coincideName) {
        console.log('nombre VALIDO');
      }else {
        console.log('DATOS INVALIDOS');
      }
    // Termina Validación
  
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
    });
  });
*/

  const btnViewLogIn = viewSignUp.querySelector('#btnViewLogIn');
  btnViewLogIn.addEventListener('click', () => {
    changeView('#/signin');
  });

  return viewSignUp;
};