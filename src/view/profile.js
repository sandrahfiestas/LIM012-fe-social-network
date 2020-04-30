// eslint-disable-next-line import/no-cycle
import { changeView } from '../view-controller/router.js';
import { signOut, user } from '../firebase-controller.js';

export default () => {
  const userName = user().displayName;

  const viewUserProfile = document.createElement('div');
  viewUserProfile.innerHTML = `
    <header class="header-home">
      <input type="checkbox" id="menu-mobile2" class="hide">
      <label for="menu-mobile2" class="menuMobile"></label>
      <nav class="nav-home hide">
        <ul class="menu-home">
          <li class="btnGoProfile" id="btnGoHome"><img class="proPicSmall" src="../img/home-ico.png">Inicio</li>
          <li class="btnGoOut" id="btnSignOut2"><img class="icoSignOut" src="../img/sign-out.png">Cerrar sesión</li>
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
            <p class="userProfile" id="name">${userName}</p>
            <button id="btnSave" class="btn-save hide">Guardar</button>
          </div>
          <h3>Sobre mí</h3>
          <p class="description">Nemo enim ipsam voluptem quia voluptas sit asper aut odit aut fugit.</p>
        </div>
        <div class="divWhite">
          <img class ="edit-icon" id="editName" src="../src/img/edition-icon.png">
        </div>
      </div>
      <div class="timeline">
        <div class="newPost"></div>
      </div>
    </section>`;

  const menuMobile = viewUserProfile.querySelector('#menu-mobile2');
  menuMobile.addEventListener('click', () => {
    const navHome = viewUserProfile.querySelector('.nav-home');
    if (menuMobile.checked === true) {
      navHome.classList.remove('hide');
    } else if (menuMobile.checked === false) {
      navHome.classList.add('hide');
    }
  });

  const btnSignOut = viewUserProfile.querySelector('#btnSignOut2');
  btnSignOut.addEventListener('click', () => {
    // changeView('#/signin');
    signOut();
  });

  const btnHome = viewUserProfile.querySelector('#btnGoHome');
  btnHome.addEventListener('click', () => {
    changeView('#/home');
  });

  const editName = viewUserProfile.querySelector('#editName');
  const btnSave = viewUserProfile.querySelector('#btnSave');
  const name = viewUserProfile.querySelector('#name');

  editName.addEventListener('click', () => {
    name.contentEditable = 'true';
    name.classList.add('input-style');
    name.focus();
    btnSave.classList.remove('hide');
    // name.classList.remove('input-style');
  });

  const saveUser = (nameUser) => {
    const userData = user();
    console.log(userData);
    userData.updateProfile({
      displayName: nameUser,
    });
  };

  const editTextName = () => {
    name.contentEditable = 'false';
    name.classList.remove('input-style');
    btnSave.classList.add('hide');
    saveUser(name.textContent);
  };

  name.addEventListener('blur', editTextName);
  btnSave.addEventListener('click', editTextName);

  return viewUserProfile;
};
