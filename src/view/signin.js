export default () => {
    const viewSignIn = document.createElement('div');
    viewSignIn.innerHTML = `
    <p class="description">Bienvenida a la red social para mujeres</p>

    <input id="emailLogIn" type="email" placeholder="e-mail">
    <input id="passwordLogIn" type="password" placeholder="contraseña">
    <button id="btnLogIn">Iniciar sesión</button>

    <p>¿No tienes cuenta?</p>
    <button id="btnSignUp"><a href="#/registro">Regístrate</a></button>`;

    return viewSignIn;
};


