export default () => {
    const viewSignUp = document.createElement('div');
    viewSignUp.innerHTML = `
    <p>Registro de usuarios</p>
    <input id="emailSignUp" type="email" placeholder="e-mail">
    <input id="passwordSignUp" type="password" placeholder="contraseña">
    <button id="newAccount">Crear cuenta</button>`;

    return viewSignUp;
};
