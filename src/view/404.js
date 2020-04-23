export default () => {
    const viewSignInUser = document.createElement('div');
    viewSignInUser.innerHTML = `
    <p>Bienvenido</p>
    <button id="btnSignOut"><a href="#/signin">Cerrar sesión</a></button>`;

    const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
      btnSignOut.addEventListener('click', () => {
        changeView('#/signin');
        signOut();
    });

    return viewSignInUser;
};