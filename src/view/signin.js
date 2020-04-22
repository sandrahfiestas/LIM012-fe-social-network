import { changeView } from '../view-controller/router.js';
import { signIn } from '../firebase-controller.js';

export default () => {
    const viewSignIn = document.createElement('div');
    viewSignIn.classList.add('signin');
    viewSignIn.innerHTML = `
    <img src="../img/logo.svg" alt="Voz Amiga" class="logo-social-network">
    <p class="text">Bienvenida a la red social para mujeres</p>
    <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
    <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
    <p class="msg-alert hide" id="msgAlert"><p>
    <button class="btn-initsession" id="btnInitSession"><a href="#/home">Iniciar sesión</a></button>
    <p class="text2">o ingresa con</p>
    <p class="text2">¿No tienes cuenta?</p>
    <button class="btn-signup" id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>`;

    const btnLogIn = viewSignIn.querySelector('#btnInitSession');
    btnLogIn.addEventListener('click', () => {
        const emailLogIn = viewSignIn.querySelector('#emailLogIn').value;
        const passwordLogIn = viewSignIn.querySelector('#passwordLogIn').value;
        const msgAlert = viewSignIn.querySelector('#msgAlert');
        // Esto deberíamos pasar a otro archivo
        signIn(emailLogIn, passwordLogIn).then(() => {
            changeView('#/home');
            console.log('todo ok');
            // Antes de eso deberíamos ver si se verificó el correo con el enlace enviado  ?
        }).catch((error) => {
            // Mostrar el error en pantalla
            console.log(error.message);
            msgAlert.classList.remove('hide');
            msgAlert.innerHTML = 'El email o la contraseña no son válidos';
        });
    });

    const btnViewSignUp = viewSignIn.querySelector('#btnViewSignUp');
    btnViewSignUp.addEventListener('click', () => {
        console.log('haciendo click');
        changeView('#/signup');
    });

    return viewSignIn;
};
