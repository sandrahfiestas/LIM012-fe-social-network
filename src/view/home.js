/* eslint-disable import/no-cycle */
import { changeView } from '../view-controller/router.js';
import { signOut } from '../firebase-controller.js';

export default () => {
  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <h1>BIENVENIDO</h1>
    <button id="btnSignOut"><a href="#/signin">Cerrar sesión</a></button>`;

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    signOut();
  });

  return viewSignInUser;
};
