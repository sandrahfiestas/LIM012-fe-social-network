import { signUp } from '../firebase-controller.js';

export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.innerHTML = `
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
        signUp(emailLogUp, passwordLogUp);

    });

    return viewSignUp;
};
