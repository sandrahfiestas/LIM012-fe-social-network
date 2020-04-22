import { changeView } from '../view-controller/router.js';
import { signUp } from '../firebase-controller.js';

export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.classList.add('signup');
    viewSignUp.innerHTML = `
    <img src="../img/logo.svg" alt="Voz Amiga" class="logo-social-network">
    <p>Registro de usuarios</p>
    <input id="emailSignUp" type="email" placeholder="e-mail">
    <input id="passwordSignUp" type="password" placeholder="contraseña">
    <button id="btnNewAccount">Crear cuenta</button>
    <h4>o ingresa con</h4>
    <p>¿Ya tienes una cuenta?</p>
    <a id="btnViewLogIn" href="#/signin">Inicia sesión</a>`;

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
        console.log('haciendo click');
        changeView('#/signin');
    });

    return viewSignUp;
};
