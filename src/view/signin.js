import { 
    signIn,
    logInFacebook
 } from '../firebase-controller.js';
// import { provider } from '../firebase-controller.js';

export default () => {
    const viewSignIn = document.createElement('div');
    viewSignIn.classList.add('signin');
    viewSignIn.innerHTML = `
    <img src="../img/logo.svg" alt="Voz Amiga" class="logo-social-network">
    <p class="text">Bienvenida a la red social para mujeres</p>
    <input class="email-login" id="emailLogIn" type="email" placeholder="e-mail" autocomplete="off">
    <input class="password-login" id="passwordLogIn" type="password" placeholder="contraseña" autocomplete="off">
    <button class="btn-initsession" id="btnInitSession"><a href="#/home">Iniciar sesión</a></button>
    <p class="text2">o ingresa con</p>
    <p class="text2">¿No tienes cuenta?</p>
    <button class="btn-signup" id="btnViewSignUp"><a href="#/signup">Regístrate</a></button>
    <p>ó</p>
    <button id="btnLogInFacebook">Inicia Sesion con FACEBOOK</button>
    `;


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

    const btnLogInFacebook = viewSignIn.querySelector('#btnLogInFacebook');
    btnLogInFacebook.addEventListener('click', () => {
        logInFacebook()
        .then((result) => {
            console.log('muestrame result: ' + result);
        }).catch((error) => {
            console.log('muestrame el error: ' + error);
        })

        /*
        provider.addScope('public_profile');
        firebase.auth()
            .signInWithPopup(provider)
            .then((datosUsuario) => {
                console.log('datos de usuario: ' + datosUsuario);
            }).catch((err) => {
                console.log('ERROR: ' + err)
            })
        */
    }); 

    return viewSignIn;
 };

