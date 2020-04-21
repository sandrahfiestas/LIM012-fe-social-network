import { signIn } from '../firebase-controller.js';

export default () => {
    const viewSignIn = document.createElement('div');
    viewSignIn.innerHTML = `
    <p class="description">Bienvenida a la red social para mujeres</p>
    <input id="emailLogIn" type="email" placeholder="e-mail">
    <input id="passwordLogIn" type="password" placeholder="contraseña">
    <button id="btnInitSession"><a href="#/home">Iniciar sesión</a></button>
    <p>¿No tienes cuenta?</p>
    <button id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>`;

    const btnLogIn = viewSignIn.querySelector('#btnInitSession');
    btnLogIn.addEventListener('click', () => {
        const emailLogIn = viewSignIn.querySelector('#emailLogIn').value;
        const passwordLogIn = viewSignIn.querySelector('#passwordLogIn').value;
        // Esto deberíamos pasar a otro archivo
        signIn(emailLogIn, passwordLogIn).then(() => {
            // Llamar a la vista HOME
            console.log('todo ok');
            // Antes de eso deberíamos ver si se verificó el correo con el enlace enviado  ?
        }).catch((error) => {
            // Mostrar el error en pantalla
            console.log(error.message);
        });
    });

    return viewSignIn;
};
