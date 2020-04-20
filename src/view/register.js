export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.innerHTML = `
    <p>Registro de usuarios</p>
    <input id="emailSignUp" type="email" placeholder="e-mail">
    <input id="passwordSignUp" type="password" placeholder="contraseña">
    <button id="btnNewAccount">Crear cuenta</button>
    <h4>o ingresa con</h4>
    <p>¿Ya tienes una cuenta?</p>
    <a id="btnViewLogIn" href="#/">Inicia sesión</a>`;

    return viewSignUp;
};
