export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.innerHTML = `
    <p>Registro de usuarios</p>
    <input id="emailSignUp" type="email" placeholder="e-mail">
    <input id="passwordSignUp" type="password" placeholder="contraseña">
    <button id="newAccount">Crear cuenta</button>
    
    <p>¿Ya tienes una cuenta?</p>
    <button id="btnViewLogIn"><a href="#/">Inicia sesión</a></button>`;

    return viewSignUp;
};
