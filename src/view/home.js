// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut } from '../firebase-controller.js';

export default () => {
  const viewSignInUser = document.createElement('div');
  viewSignInUser.innerHTML = `
    <header class="header-home">
      <nav class="nav-home">
        <ul class="menu-home">
          <li class="">Perfil</li>
          <li class="btnSignOut" id="btnSignOut"><a href="#/signin">Cerrar sesión</a></li>
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
            <p class="userProfile">Micaela García</p>
          </div>
          <h3>Sobre mí</h3>
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
        <div class="divWhite"></div>
      </div>
      <div class="timeline">
        <div class="newPost"></div>
      </div>
    </section>
    `;

  const btnSignOut = viewSignInUser.querySelector('#btnSignOut');
  btnSignOut.addEventListener('click', () => {
    changeView('#/signin');
    signOut();
  });

  return viewSignInUser;
};
