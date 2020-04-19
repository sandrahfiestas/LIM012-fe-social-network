export default () => {
    const viewSignInUser = document.createElement('div');
    viewSignInUser.innerHTML = `
    <p>Bienvenido</p>
    <button id="btnSignOut"><a href="#/">Cerrar sesión</a></button>`;

    return viewSignInUser;
};
