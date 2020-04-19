export default () => {
    const viewSignInUser = document.createElement('div');
    viewSignInUser.innerHTML = `
    <p>Bienvenido</p>
    <button id="btnSignOut">Cerrar sesión</button>`;

    return viewSignInUser;
};
