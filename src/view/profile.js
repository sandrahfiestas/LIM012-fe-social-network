// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut } from '../firebase-controller.js';

export default () => {
  const userName = firebase.auth().currentUser.displayName;

  const viewUserProfile = document.createElement('div');
  viewUserProfile.innerHTML = `
    <header class="header-home">
      <nav class="nav-home">
        <ul class="menu-home">
          <li class="btnHeader" id="btnHome">Inicio</li>
          <li class="btnHeader" id="btnSignOut">Cerrar sesión</li>
        </ul>
      </nav>
      <button class="btnHome"><a href="#/home"></a></button>
    </header>
    <section class="containerHome">
      <div class="profileSection">
        <div class="coverImage"></div>
        <div class="profile">
          <div class="profileDiv">
            <div class="profilePicture"></div>
            <p class="userProfile">${userName}</p>
          </div>
          <h3>Sobre mí</h3>
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
        <div class="divWhite"></div>
      </div>
      <div class="timeline">
        <div class="newPost"></div>
      </div>
    </section>`;

  const btnSignOut = viewUserProfile.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    signOut();
  });

  const btnHome = viewUserProfile.querySelector('#btnHome');
  btnHome.addEventListener('click', () => {
    changeView('#/home');
  });

  return viewUserProfile;
};
