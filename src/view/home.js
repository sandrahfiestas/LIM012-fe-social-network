// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut } from '../firebase-controller.js';

export default () => {
  const userName = firebase.auth().currentUser.displayName;

  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
    <input type="checkbox" id="menu-mobile" class="hide">
    <label for="menu-mobile" class="menuMobile"></label>
    <nav class="nav-home hide">
      <ul class="menu-home">
        <li class="btnGoProfile" id="btnProfile"><img class="proPicSmall" src="../img/profile-ico.png">Perfil</li>
        <li class="btnGoOut" id="btnSignOut"><img class="icoSignOut" src="../img/sign-out.png">Cerrar sesión</li>
      </ul>
    </nav>
    <img src="../img/logo-voz-amiga.png" alt="Voz Amiga">
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

  const menuMobile = viewSignInUser.querySelector('#menu-mobile');
  menuMobile.addEventListener('click', () => {
    const navHome = viewSignInUser.querySelector('.nav-home');
    if (menuMobile.checked === true) {
      navHome.classList.remove('hide');
    } else if (menuMobile.checked === false) {
      navHome.classList.add('hide');
    }
  });

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    signOut();
  });

  const btnProfile = viewSignInUser.querySelector('#btnProfile');
  btnProfile.addEventListener('click', () => {
    changeView('#/profile');
  });

  // const btnViewHome = viewSignInUser.querySelector('#btnHome');
  // btnViewHome.addEventListener('click', () => {
  //   changeView('#/home');
  // });

  return viewSignInUser;
};
